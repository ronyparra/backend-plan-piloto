import db from "../db";

const query = `SELECT idmoneda, descripcion, abreviatura FROM moneda`;

const MonedaService = {
  getAll: async () => {
      const results = await db.query(query);
      return results.rows;
  },
};

export default MonedaService;
