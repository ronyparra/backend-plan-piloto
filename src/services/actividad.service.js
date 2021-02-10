import db from "../db";

const ActividadService = {
  getAll: async () => {
    const query = `SELECT json_build_object(
      'idactividad',idactividad,
      'idcliente', json_build_object(
        'idcliente', cliente.idcliente,
        'razonsocial', cliente.razonsocial
      ),
      'idusuario', json_build_object(
        'idusuario', usuario.idusuario,
        'nombre', usuario.nombre
      ),
      'idestadocobro', json_build_object(
        'idestadocobro', estadocobro.idestadocobro,
        'descripcion', estadocobro.descripcion
      ),
      'solicitante', solicitante,
      'comentario', comentario,
      'fecha', fecha
    ) as rows
    FROM actividad
    JOIN cliente USING (idcliente)
    JOIN estadocobro USING (idestadocobro)
    JOIN usuario USING (idusuario)`;
    try {
      const results = await db.query(query);
      console.log(results)
      return results.rows.map(x=>x.rows);
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(
        "SELECT * FROM actividad WHERE idactividad  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ master, tecnico, detalle }) => {
    try {
      const results = await db.query(
        "INSERT INTO actividad( idcliente, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          master.idcliente,
          master.idusuario,
          master.idestadocobro,
          master.solicitante,
          master.comentario,
          master.fecha,
        ]
      );
      const idactividad = results.rows[0].idactividad;

      const actividad_tecnico = [
        tecnico.reduce((acc, curr) => {
          if (acc !== "") acc = acc + ",";
          return (acc =
            acc + `(${idactividad},${curr.idusuario},${curr.precio})`);
        }, ""),
      ];

      const actividad_detalle = [
        detalle.reduce((acc, curr) => {
          if (acc !== "") acc = acc + ",";
          return (acc =
            acc +
            `(${idactividad},${curr.idconcepto.idconcepto},${curr.precio},${curr.cantidad})`);
        }, ""),
      ];
      const resultsTecnico = await db.query(
        `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ${actividad_tecnico} RETURNING *`
      );
      const resultsConcepto = await db.query(
        `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ${actividad_detalle} RETURNING *`
      );
      results.rows[0].tecnico = resultsTecnico.rows;
      results.rows[0].detalle = resultsConcepto.rows;
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ razonsocial, ruc }) => {
    try {
      const results = await db.query(
        "UPDATE actividad SET razonsocial = $1, ruc = $2 RETURNING *",
        [razonsocial, ruc]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      const results = await db.query(
        "DELETE FROM actividad WHERE idactividad  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default ActividadService;
