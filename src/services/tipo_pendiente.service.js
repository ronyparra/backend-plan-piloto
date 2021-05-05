import db from "../db";

const query = `SELECT idtipo_pendiente, descripcion, color FROM tipo_pendiente`;

const PendienteService = {
  getAll: async () => {
    try {
      const results = await db.query(query);
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(query + " WHERE idtipo_pendiente  = $1", [id]);
      return results.rows[0];
    } catch (e) {
      throw e;
    }
  },
  create: async ({ descripcion, color }) => {
    try {
      const results = await db.query(
        "INSERT INTO tipo_pendiente(descripcion, color) VALUES ($1, $2 ) RETURNING *",
        [descripcion, color ]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ descripcion, color, id }) => {
    try {
      const results = await db.query(
        "UPDATE tipo_pendiente SET descripcion = $1, color = $2 WHERE idtipo_pendiente = $3 RETURNING *",
        [descripcion, color, id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      const results = await db.query(
        "DELETE FROM tipo_pendiente WHERE idtipo_pendiente  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default PendienteService;
