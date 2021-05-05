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
    const results = await db.query(query);
    return results.rows.map((x) => x.rows);
  },
  getById: async (id) => {
    const results = await db.query(query + " WHERE idcategoria  = $1", [id]);
    return results.rows[0].rows;
  },
  create: async ({ descripcion }) => {
    const results = await db.query(
      "INSERT INTO categoria(descripcion) VALUES ($1) RETURNING *",
      [descripcion]
    );
    return results.rows;
  },
  update: async ({ descripcion, id }) => {
    const results = await db.query(
      "UPDATE categoria SET descripcion = $1 WHERE idcategoria = $2 RETURNING *",
      [descripcion, id]
    );
    return results.rows;
  },
  delete: async (id) => {
    const results = await db.query(
      "DELETE FROM categoria WHERE idcategoria  = $1",
      [id]
    );
    return results.rows;
  },
};

export default CategoriaService;
