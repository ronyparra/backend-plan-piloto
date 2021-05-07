import db from "../db";
const query = `SELECT idcarpeta, descripcion FROM carpeta`;
const CarpetaService = {
  getAll: async () => {
    const results = await db.query(query);
    return results.rows;
  },
  getById: async (id) => {
    const results = await db.query(query + " WHERE idcarpeta  = $1", [id]);
    return results.rows;
  },
  create: async ({ descripcion }) => {
    const results = await db.query(
      "INSERT INTO carpeta (descripcion) VALUES ($1)  RETURNING *",
      [descripcion]
    );
    return results.rows;
  },
  update: async ({ descripcion, id }) => {
    const results = await db.query(
      "UPDATE carpeta SET descripcion = $1 WHERE idcarpeta = $2 RETURNING *",
      [descripcion, id]
    );
    return results.rows;
  },
  delete: async (id) => {
    const results = await db.query(
      "DELETE FROM carpeta WHERE idcarpeta  = $1",
      [id]
    );
    return results.rows;
  },
};

export default CarpetaService;
