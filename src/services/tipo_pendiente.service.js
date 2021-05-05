import db from "../db";

const query = `SELECT idtipo_pendiente, descripcion, color FROM tipo_pendiente`;

const PendienteService = {
  getAll: async () => {
    const results = await db.query(query);
    return results.rows;
  },
  getById: async (id) => {
    const results = await db.query(query + " WHERE idtipo_pendiente  = $1", [
      id,
    ]);
    return results.rows[0];
  },
  create: async ({ descripcion, color }) => {
    const results = await db.query(
      "INSERT INTO tipo_pendiente(descripcion, color) VALUES ($1, $2 ) RETURNING *",
      [descripcion, color]
    );
    return results.rows;
  },
  update: async ({ descripcion, color, id }) => {
    const results = await db.query(
      "UPDATE tipo_pendiente SET descripcion = $1, color = $2 WHERE idtipo_pendiente = $3 RETURNING *",
      [descripcion, color, id]
    );
    return results.rows;
  },
  delete: async (id) => {
    const results = await db.query(
      "DELETE FROM tipo_pendiente WHERE idtipo_pendiente  = $1",
      [id]
    );
    return results.rows;
  },
};

export default PendienteService;
