import db from "../db";
const query = `
SELECT 
	json_build_object(
		'idarchivo', idarchivo,
		'descripcion', archivo.descripcion,
		'comentario', comentario,
		'filepath', filepath,
    'idcarpeta', json_build_object(
      'idcarpeta', carpeta.idcarpeta,
      'descripcion', carpeta.descripcion
    ),
		'idcliente', json_build_object(
			'idcliente',cliente.idcliente,
			'razonsocial',cliente.razonsocial
		)
	) as rows
FROM archivo
JOIN cliente USING (idcliente)
JOIN carpeta USING (idcarpeta)
`;
const ArchivoService = {
  getAll: async () => {
    const results = await db.query(query);
    return results.rows.map((x) => x.rows);
  },
  getById: async (id) => {
    const results = await db.query(query + " WHERE idarchivo  = $1", [id]);
    return results.rows[0].rows;
  },
  getByIdCliente: async (id,idcarpeta) => {
    const results = await db.query(query + " WHERE cliente.idcliente =$1 AND carpeta.idcarpeta = $2", [id, idcarpeta]);
    return results.rows.map((x) => x.rows);
  },
  create: async ({ descripcion, comentario, filepath, idcliente, idcarpeta}) => {
    const results = await db.query(
      "INSERT INTO archivo (idcliente, descripcion, comentario, filepath, idcarpeta) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [idcliente, descripcion, comentario, filepath, idcarpeta]
    );
    return results.rows;
  },
  update: async ({ descripcion, comentario, filepath, idcliente, idcarpeta, id }) => {
    const results = await db.query(
      "UPDATE archivo SET idcliente=$1, descripcion=$2, comentario=$3, filepath=$4, idcarpeta=$5 WHERE idarchivo = $6 RETURNING *",
      [idcliente, descripcion, comentario, filepath, idcarpeta, id]
    );
    return results.rows;
  },
  delete: async (id) => {
    const results = await db.query(
      "DELETE FROM archivo WHERE idarchivo  = $1",
      [id]
    );
    return results.rows;
  },
};

export default ArchivoService;
