import db from "../db";
const query = `
SELECT 
	json_build_object(
		'idconcepto', idconcepto,
		'descripcion', concepto.descripcion,
		'precio', precio,
		'idmoneda', json_build_object(
			'idmoneda', moneda.idmoneda,
			'descripcion', moneda.descripcion,
			'abreviatura', moneda.abreviatura
		),
    'idcategoria', json_build_object(
      'idcategoria', categoria.idcategoria,
      'descripcion', categoria.descripcion
    )
	) as rows
FROM concepto
JOIN moneda USING (idmoneda)
JOIN categoria USING (idcategoria)
`;
const ConceptoService = {
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
      const results = await db.query(query + " WHERE idconcepto  = $1", [id]);
      return results.rows[0].rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ descripcion, precio, idmoneda, idcategoria }) => {
    try {
      const results = await db.query(
        "INSERT INTO concepto(descripcion, precio, idmoneda, idcategoria) VALUES ($1, $2, $3, $4) RETURNING *",
        [descripcion, precio, idmoneda, idcategoria]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ descripcion, precio, idmoneda, idcategoria, id }) => {
    try {
      const results = await db.query(
        "UPDATE concepto SET descripcion = $1, precio = $2, idmoneda = $3, idcategoria = $4 WHERE idconcepto = $5 RETURNING *",
        [descripcion, precio, idmoneda, idcategoria, id]
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
