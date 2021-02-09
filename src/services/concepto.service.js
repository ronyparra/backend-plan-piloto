import db from "../db";

const ConceptoService = {
  getAll: async () => {
    try {
      const results = await db.query("SELECT * FROM concepto");
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(
        "SELECT * FROM concepto WHERE idconcepto  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ descripcion, precio }) => {
    try {
      const results = await db.query(
        "INSERT INTO concepto(descripcion, precio) VALUES ($1, $2) RETURNING *",
        [descripcion, precio]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ descripcion, precio}) => {
    try {
      const results = await db.query(
        "UPDATE concepto SET descripcion = $1, precio = $2 RETURNING *",
        [descripcion, precio]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      const results = await db.query(
        "DELETE FROM concepto WHERE idconcepto  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default ConceptoService;
