import db from "../../db";
import { getById } from "./fetch.service";
import {
  calcularTotal,
  formatMaster,
  CHANGE_ACTIVIDAD_STATUS,
  INSERT_CLIENTE_COBRO,
  INSERT_ACTIVIDAD,
  INSERT_DET_ACT_COBRO,
  INSERT_DET_TECNICO,
  INSERT_DET_PENDIENTE,
  INSERT_DET_CONCEPTO,
  UPDATE_ACTIVIDAD,
  UPDATE_PENDIENTE,
  DELETE_ACTIVIDAD,
  DELETE_DET_CONCEPTO,
  DELETE_DET_TECNICO,
  DELETE_DET_PENDIENTE,
} from "./formatter";

import { current_date } from "../../util/date.util";

export const create = async (
  { master, tecnico, detalle, actividad_pendiente },
  disabledTransaction
) => {
  try {
    if (!disabledTransaction) await db.query("BEGIN");
    const results = await db.query(
      INSERT_ACTIVIDAD(
        master.idcliente,
        master.idcliente_sucursal,
        master.idusuario,
        master.idestadocobro,
        master.solicitante,
        master.comentario,
        master.fecha
      )
    );
    const idactividad = results.rows[0].idactividad;
    const resultsTecnico = await db.query(
      INSERT_DET_TECNICO(tecnico, idactividad)
    );
    const resultsConcepto = await db.query(
      INSERT_DET_CONCEPTO(detalle, idactividad)
    );

    if (actividad_pendiente.length > 0) {
      await db.query(INSERT_DET_PENDIENTE(idactividad, actividad_pendiente[0]));
      await db.query(UPDATE_PENDIENTE(actividad_pendiente[0], false));
    }
    results.rows[0].tecnico = resultsTecnico.rows;
    results.rows[0].detalle = resultsConcepto.rows;
    if (!disabledTransaction) await db.query("COMMIT");
    return results.rows;
  } catch (e) {
    if (!disabledTransaction) await db.query("ROLLBACK");
    throw e;
  }
};
export const changeStatus = async ({
  detalle,
  idestadocobro,
  idusuario,
  descripcion,
}) => {
  const actividadesSinOrden = [];

  try {
    await db.query("BEGIN");
    for (const actividad of detalle) {
      const detActividadMoneda = ordenarDetActividadPorMoneda(
        actividad.detalle
      );
      if (detActividadMoneda.length > 1) {
        for (const [index, detConcepto] of detActividadMoneda.entries()) {
          if (index === 0) {
            const execute = `${DELETE_DET_CONCEPTO(actividad.idactividad)} 
              ${INSERT_DET_CONCEPTO(detConcepto, actividad.idactividad)}`;
            await db.query(execute);
            actividad.detalle = JSON.parse(JSON.stringify(detConcepto));
          } else {
            const results = await create(
              {
                master: formatMaster(actividad),
                tecnico: actividad.tecnico,
                detalle: detConcepto,
                actividad_pendiente: actividad.actividad_pendiente,
              },
              true
            );
            
            const newActividad = await getById(results[0].idactividad);
            actividadesSinOrden.push({
              ...newActividad,
              moneda: detConcepto[0].moneda,
            });
          }
        }
      }
      actividadesSinOrden.push(actividad);
    }
    const actividadesConOrden = ordenarActividadPorMoneda(actividadesSinOrden);

    for (const actividad of actividadesConOrden) {
      const saldoacobrar = calcularTotal(actividad);
      await db.query(CHANGE_ACTIVIDAD_STATUS(actividad, idestadocobro));
      const results = await db.query(
        INSERT_CLIENTE_COBRO(
          descripcion,
          actividad[0].idcliente.idcliente,
          current_date(),
          idusuario,
          saldoacobrar,
          actividad[0].moneda
        )
      );
      await db.query(
        INSERT_DET_ACT_COBRO(actividad, results.rows[0].idcliente_cobro)
      );
    }
    await db.query("COMMIT");
  } catch (error) {
    db.query("ROLLBACK");
    throw error;
  }
};
export const update = async ({
  id,
  master,
  tecnico,
  detalle,
  actividad_pendiente,
}) => {
  try {
    await db.query("BEGIN");
    const results = await db.query(
      UPDATE_ACTIVIDAD(
        id,
        master.idcliente,
        master.idcliente_sucursal,
        master.idusuario,
        master.idestadocobro,
        master.solicitante,
        master.comentario,
        master.fecha
      )
    );
    await db.query(DELETE_DET_TECNICO(id));
    await db.query(DELETE_DET_CONCEPTO(id));
    await db.query(DELETE_DET_PENDIENTE(id));

    const resultsTecnico = await db.query(INSERT_DET_TECNICO(tecnico, id));
    const resultsConcepto = await db.query(INSERT_DET_CONCEPTO(detalle, id));

    if (actividad_pendiente.length > 0)
      await db.query(INSERT_DET_PENDIENTE(id, actividad_pendiente[0]));

    results.rows[0].tecnico = resultsTecnico.rows;
    results.rows[0].detalle = resultsConcepto.rows;
    await db.query("COMMIT");
    return results.rows;
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  }
};
export const delet = async (id) => {
  try {
    await db.query("BEGIN");
    await db.query(DELETE_DET_TECNICO(id));
    await db.query(DELETE_DET_CONCEPTO(id));
    const pendiente = await db.query(DELETE_DET_PENDIENTE(id));
    if (pendiente.rows.length > 0)
      await db.query(UPDATE_PENDIENTE(pendiente.rows[0].idpendiente, true));
    const results = await db.query(DELETE_ACTIVIDAD(id));
    await db.query("COMMIT");
    return results.rows;
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  }
};

const ordenarDetActividadPorMoneda = (detalle) => {
  detalle.map((concepto) => {
    concepto.moneda = concepto.idmoneda.idmoneda;
  });
  const detReordenado = orderByKey(detalle, "moneda");
  return Object.entries(detReordenado).map((entry) => entry[1]);
};

const ordenarActividadPorMoneda = (actividades) => {
  actividades.map((actividad) => {
    actividad.moneda = actividad.moneda
      ? actividad.moneda
      : actividad.detalle[0].moneda;
  });
  const actividadReordenado = orderByKey(actividades, "moneda");
  return Object.entries(actividadReordenado).map((entry) => entry[1]);
};

const orderByKey = (list, key) =>
  list.reduce(
    (hash, { [key]: value, ...rest }) => ({
      ...hash,
      [value]: (hash[value] || []).concat({ [key]: value, ...rest }),
    }),
    {}
  );
