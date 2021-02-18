import db from "../db";

const query = `SELECT idestadocobro, descripcion FROM estadocobro`;

const EstadoCobroService = {
  getAll: async () => {
    try {
      const results = await db.query(query);
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default EstadoCobroService;
