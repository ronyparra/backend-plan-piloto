import db from "../db";
const query = `
SELECT 
	json_build_object(
		'idcategoria', idcategoria,
		'descripcion', descripcion
	) as rows
FROM categoria
`;
const CategoriaService = {
  getAll: async () => {
    try {
      const results = await db.query(query);
      return results.rows.map((x) => x.rows);
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(query + " WHERE idcategoria  = $1", [id]);
      return results.rows[0].rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ descripcion }) => {
    try {
      const results = await db.query(
        "INSERT INTO categoria(descripcion) VALUES ($1) RETURNING *",
        [descripcion]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ descripcion, id }) => {
    try {
      const results = await db.query(
        "UPDATE categoria SET descripcion = $1 WHERE idcategoria = $2 RETURNING *",
        [descripcion, id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      const results = await db.query(
        "DELETE FROM categoria WHERE idcategoria  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default CategoriaService;
