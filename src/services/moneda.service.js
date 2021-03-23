import db from "../db";

const query = `SELECT idmoneda, descripcion, abreviatura FROM moneda`;

const MonedaService = {
  getAll: async () => {
    try {
      const results = await db.query(query);
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default MonedaService;
