import db from "../db";

const query = `SELECT idestadocobro, descripcion FROM estadocobro`;

const EstadoCobroService = {
  getAll: async () => {
      const results = await db.query(query);
      return results.rows;
  },
};

export default EstadoCobroService;
