import db, { pool } from "../db";
const query = `
SELECT 
	json_build_object(
		'idarchivo', idarchivo,
    'idcliente', json_build_object(
			'idcliente',cliente.idcliente,
			'razonsocial',cliente.razonsocial
		),
    'idcarpeta', json_build_object(
      'idcarpeta', carpeta.idcarpeta,
      'descripcion', carpeta.descripcion
    ),
		'descripcion', archivo.descripcion,
		'comentario', comentario,
    'archivo_detalle', (
      SELECT json_agg(
        json_build_object(
          'idarchivo_detalle', ad.idarchivo_detalle,
          'idarchivo', ad.idarchivo,
          'idcliente', ad.idcliente,
          'descripcion', ad.descripcion,
          'titulo', ad.titulo
        )
      )
      FROM  archivo_detalle AS ad
      WHERE ad.idarchivo  = archivo.idarchivo
      AND   ad.idcliente  = archivo.idcliente
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
  getByIdCliente: async (id, idcarpeta) => {
    const results = await db.query(
      query + " WHERE cliente.idcliente =$1 AND carpeta.idcarpeta = $2",
      [id, idcarpeta]
    );
    return results.rows.map((x) => x.rows);
  },
  create: async ({
    descripcion,
    comentario,
    idcliente,
    idcarpeta,
    archivo_detalle,
  }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const results = await client.query(
        "INSERT INTO archivo (idcliente, descripcion, comentario, idcarpeta) VALUES ($1, $2, $3, $4) RETURNING *",
        [idcliente, descripcion, comentario, idcarpeta]
      );
      const idarchivo = results.rows[0].idarchivo;
      const resultDet = await client.query(
        insertDet(formatDet(archivo_detalle, idarchivo, idcliente))
      );
      results.rows[0].archivo_detalle = resultDet.rows;
      await client.query("COMMIT");
      return results.rows;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  },
  update: async ({
    descripcion,
    comentario,
    idcliente,
    idcarpeta,
    archivo_detalle,
    id,
  }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const results = await client.query(
        `UPDATE archivo SET idcarpeta=$1, descripcion=$2, comentario=$3 WHERE idarchivo=$4, idcliente=$5  RETURNING *`,
        [idcarpeta, descripcion, comentario, id, idcliente]
      );
      await client.query(
        "DELETE FROM archivo_detalle WHERE idarchivo = $1 AND idcliente = $2;",
        [id, idcliente]
      );
      await client.query(insertDet(formatDet(archivo_detalle, id, idcliente)));
      await client.query("COMMIT");
      return results.rows;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  },
  delete: async (id) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("DELETE FROM archivo_detalle WHERE idarchivo = $1", [
        id,
      ]);
      const results = await client.query(
        "DELETE FROM archivo WHERE idarchivo  = $1",
        [id]
      );

      await client.query("COMMIT");
      return results.rows;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  },
};

const formatDet = (detalle, id, idcliente) => {
  return detalle.reduce((acc, curr) => {
    if (acc !== "") acc = acc + ",\n";
    return (acc =
      acc + `(${id},${idcliente},'${curr.descripcion}','${curr.titulo}')`);
  }, "");
};

const insertDet = (value) =>
  `INSERT INTO archivo_detalle(idarchivo, idcliente, descripcion, titulo) VALUES ${value} RETURNING *;`;

export default ArchivoService;
