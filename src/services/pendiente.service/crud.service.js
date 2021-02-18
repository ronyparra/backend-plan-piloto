import db from "../../db";

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
	  'descripcion', pendiente.descripcion
	  ) as rows
  FROM pendiente
  JOIN tipo_pendiente as tp USING (idtipo_pendiente)`;

export const getAll = async () => {
  try {
    const results = await db.query(query);
    return results.rows.map((x) => x.rows);
  } catch (e) {
    throw e;
  }
};
export const getById = async (id) => {
  try {
    const results = await db.query(query + " WHERE idpendiente  = $1", [id]);
    return results.rows[0].rows;
  } catch (e) {
    throw e;
  }
};
export const create = async ({ idtipo_pendiente, fecha, descripcion }) => {
  try {
    const results = await db.query(
      "INSERT INTO pendiente(idtipo_pendiente, fecha, descripcion) VALUES ($1, $2, $3) RETURNING *",
      [idtipo_pendiente, fecha, descripcion]
    );
    return results.rows;
  } catch (e) {
    throw e;
  }
};
export const update = async ({ idtipo_pendiente, fecha, descripcion, id }) => {
  try {
    const results = await db.query(
      "UPDATE pendiente SET idtipo_pendiente = $1, fecha = $2, descripcion = $3 WHERE idpendiente = $4 RETURNING *",
      [idtipo_pendiente, fecha, descripcion, id]
    );
    return results.rows;
  } catch (e) {
    throw e;
  }
};
export const delet = async (id) => {
  try {
    const results = await db.query(
      "DELETE FROM pendiente WHERE idpendiente  = $1",
      [id]
    );
    return results.rows;
  } catch (e) {
    throw e;
  }
};
