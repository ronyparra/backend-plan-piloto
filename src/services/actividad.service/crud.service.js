import db from "../../db";
import { formatDetalle, formatTecnico } from "./formatter";

export const create = async ({ master, tecnico, detalle }) => {
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
      `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ${actividad_tecnico} RETURNING *`
    );
    const resultsConcepto = await db.query(
      `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ${actividad_detalle} RETURNING *`
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
export const update = async ({ id, master, tecnico, detalle }) => {
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
    const actividad_tecnico = formatTecnico(tecnico, id);
    const actividad_detalle = formatDetalle(detalle, id);

    const resultsTecnico = await db.query(
      `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ${actividad_tecnico} RETURNING *`
    );
    const resultsConcepto = await db.query(
      `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ${actividad_detalle} RETURNING *`
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
