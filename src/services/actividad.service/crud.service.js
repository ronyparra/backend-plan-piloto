import db from "../../db";
import {
  calcularTotal,
  formatDetalle,
  formatTecnico,
  formatActividadCobro,
  formatActividadChangeStatus,
} from "./formatter";
import { current_date } from "../../util/date.util";

export const create = async ({
  master,
  tecnico,
  detalle,
  actividad_pendiente,
}) => {
  try {
    await db.query("BEGIN");
    const results = await db.query(
      "INSERT INTO actividad( idcliente,idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        master.idcliente,
        master.idcliente_sucursal,
        master.idusuario,
        master.idestadocobro,
        master.solicitante,
        master.comentario,
        master.fecha,
      ]
    );
    const idactividad = results.rows[0].idactividad;
    const actividad_tecnico = formatTecnico(tecnico, idactividad);
    const actividad_detalle = formatDetalle(detalle, idactividad);
    const resultsTecnico = await db.query(
      `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES ${actividad_tecnico} RETURNING *`
    );
    const resultsConcepto = await db.query(
      `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad, idmoneda)VALUES ${actividad_detalle} RETURNING *`
    );
    if (actividad_pendiente.length > 0) {
      await db.query(
        "INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES ($1, $2)",
        [idactividad, actividad_pendiente[0]]
      );
      await db.query(
        "UPDATE pendiente SET activo = false WHERE idpendiente = $1",
        [actividad_pendiente[0]]
      );
    }
    results.rows[0].tecnico = resultsTecnico.rows;
    results.rows[0].detalle = resultsConcepto.rows;
    await db.query("COMMIT");
    return results.rows;
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  }
};
export const changeStatus = async ({
  detalle,
  idestadocobro,
  idusuario,
  descripcion,
}) => {

  const total = calcularTotal(detalle);
  const idcliente = detalle[0].idcliente.idcliente;

  console.log(detalle)

  try {
    await db.query("BEGIN");
    await db.query(formatActividadChangeStatus(detalle, idestadocobro));
    const results = await db.query(
      `INSERT INTO cliente_cobro(
        idestadocobro, descripcion, idcliente, fechainsert, fechacobro, idusuarioinsert, idusuariocobro, comentario, saldocobrado, saldoacobrar, retencion, idmoneda)
      VALUES (2, $1, $2, $3, null, $4, null, null, 0, $5, false, $6) RETURNING *`,
      [descripcion, idcliente, current_date(), idusuario, total, 1]
    );
    await db.query(`INSERT INTO actividad_cobro(idcliente_cobro, idactividad) VALUES ${formatActividadCobro(detalle,results.rows[0].idcliente_cobro)}`);
    await db.query("COMMIT");
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
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
      "UPDATE actividad SET idcliente=$2, idcliente_sucursal=$3, idusuario=$4, idestadocobro=$5, solicitante=$6, comentario=$7, fecha=$8 WHERE idactividad = $1 RETURNING *",
      [
        id,
        master.idcliente,
        master.idcliente_sucursal,
        master.idusuario,
        master.idestadocobro,
        master.solicitante,
        master.comentario,
        master.fecha,
      ]
    );
    await db.query(
      "DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1",
      [id]
    );
    await db.query(
      "DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1",
      [id]
    );
    await db.query("DELETE FROM actividad_pendiente WHERE idactividad = $1", [
      id,
    ]);
    const actividad_tecnico = formatTecnico(tecnico, id);
    const actividad_detalle = formatDetalle(detalle, id);

    const resultsTecnico = await db.query(
      `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES ${actividad_tecnico} RETURNING *`
    );
    const resultsConcepto = await db.query(
      `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad, idmoneda)VALUES ${actividad_detalle} RETURNING *`
    );

    if (actividad_pendiente.length > 0)
      await db.query(
        "INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES ($1, $2)",
        [id, actividad_pendiente[0]]
      );

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
    await db.query(
      "DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1",
      [id]
    );
    await db.query(
      "DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1",
      [id]
    );
    const pendiente = await db.query(
      "DELETE FROM actividad_pendiente WHERE idactividad = $1 RETURNING *",
      [id]
    );
    if (pendiente.rows.length > 0)
      await db.query(
        "UPDATE pendiente SET activo = true WHERE idpendiente = $1",
        [pendiente.rows[0].idpendiente]
      );
    const results = await db.query(
      "DELETE FROM actividad WHERE idactividad  = $1",
      [id]
    );
    await db.query("COMMIT");
    return results.rows;
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  }
};
