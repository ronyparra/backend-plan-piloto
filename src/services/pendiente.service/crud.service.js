import db, { pool } from "../../db";
import { INSERT_DET_PENDIENTE_TECNICO } from "../actividad.service/formatter";
const query = `
  SELECT 
	  json_build_object(
	  'idpendiente',idpendiente, 
	  'idtipo_pendiente',json_build_object(
		  'idtipo_pendiente', tp.idtipo_pendiente,
		  'descripcion',tp.descripcion,
		  'color', tp.color
	  ), 
	  'fecha', to_char(fecha, 'DD-MM-YYYY'),
    'descripcion', pendiente.descripcion,
    'activo',pendiente.activo,
    'pendiente_tecnico',COALESCE((
      SELECT json_agg(
        json_build_object(
          'idusuario',pen.idusuario,
          'nombre',usu.nombre
        )
      )
      FROM    pendiente_tecnico AS pen
      JOIN    usuario AS usu ON pen.idusuario = usu.idusuario
      WHERE   idpendiente = pendiente.idpendiente
    ),'[]')
	  ) as rows
  FROM pendiente
  JOIN tipo_pendiente as tp USING (idtipo_pendiente)`;

export const getAll = async () => {
    const results = await db.query(
      query + " WHERE activo = true ORDER BY activo DESC"
    );
    return results.rows.map((x) => x.rows);
};
export const getById = async (id) => {
  try {
    const results = await db.query(query + " WHERE idpendiente  = $1", [id]);
    return results.rows[0].rows;
  } catch (e) {
    throw e;
  }
};
export const create = async ({
  idtipo_pendiente,
  fecha,
  descripcion,
  pendiente_tecnico,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const results = await client.query(
      "INSERT INTO pendiente(idtipo_pendiente, fecha, descripcion) VALUES ($1, $2, $3) RETURNING *",
      [idtipo_pendiente, fecha, descripcion]
    );
    if (pendiente_tecnico.length > 0) {
      const idpendiente = results.rows[0].idpendiente;
      const resultsTecnico = await client.query(
        INSERT_DET_PENDIENTE_TECNICO(pendiente_tecnico, idpendiente)
      );
      results.rows[0].pendiente_tecnico = resultsTecnico.rows;
    }
    await client.query("COMMIT");
    return results.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

export const changeStatus = async ({ activo, idpendiente }) => {
  try {
    const result = await db.query(
      "UPDATE pendiente SET activo = $1 WHERE idpendiente = $2 RETURNING * ",
      [activo, idpendiente]
    );
  } catch (e) {
    throw e;
  }
};

export const update = async ({
  idtipo_pendiente,
  fecha,
  descripcion,
  pendiente_tecnico,
  id,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const results = await client.query(
      "UPDATE pendiente SET idtipo_pendiente = $1, fecha = $2, descripcion = $3 WHERE idpendiente = $4 RETURNING *",
      [idtipo_pendiente, fecha, descripcion, id]
    );

    await client.query("DELETE FROM pendiente_tecnico WHERE idpendiente = $1", [
      id,
    ]);
    if (pendiente_tecnico.length > 0) {
      const resultsTecnico = await client.query(
        INSERT_DET_PENDIENTE_TECNICO(pendiente_tecnico, id)
      );
      results.rows[0].pendiente_tecnico = resultsTecnico.rows;
    }
    await client.query("COMMIT");
    return results.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};
export const delet = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM pendiente_tecnico WHERE idpendiente = $1", [
      id,
    ]);
    const results = await client.query(
      "DELETE FROM pendiente WHERE idpendiente  = $1",
      [id]
    );
    await client.query("COMMIT");
    return results.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }finally {
    client.release();
  }
};
