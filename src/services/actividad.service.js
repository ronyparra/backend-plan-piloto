import db from "../db";

const query = `SELECT 
        json_build_object(
          'idactividad', idactividad, 
          'idcliente', json_build_object(
            'idcliente', cliente.idcliente, 
            'razonsocial', cliente.razonsocial
          ), 
          'idcliente_sucursal', json_build_object(
            'idcliente_sucursal',cli_suc.idcliente_sucursal,
            'descripcion', cli_suc.descripcion
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
          'fecha', to_char(fecha, 'DD-MM-YYYY'), 
          'tecnico', (
            SELECT json_agg(
                json_build_object(
                      'idusuario', tec.idusuario,
                      'nombre', usu.nombre,
                      'precio', tec.precio
                )
            )
            FROM    actividad_tecnico_detalle as tec
            JOIN    usuario as usu ON tec.idusuario = usu.idusuario
            WHERE   idactividad = actividad.idactividad
          ), 
          'detalle', (
            SELECT json_agg(
                json_build_object(
                    'idconcepto', json_build_object(
                        'idconcepto', conc.idconcepto,
                        'descripcion', conc.descripcion
                    ), 
                    'precio', det.precio, 
                    'cantidad', det.cantidad
                )
            )
            FROM    actividad_concepto_detalle AS det
            JOIN    concepto as conc ON det.idconcepto = conc.idconcepto
            WHERE   idactividad = actividad.idactividad

          )) as rows
    FROM actividad
    JOIN cliente USING (idcliente)
    JOIN cliente_sucursal as cli_suc 
      ON  actividad.idcliente = cli_suc.idcliente
      AND actividad.idcliente_sucursal = cli_suc.idcliente_sucursal
    JOIN estadocobro USING (idestadocobro)
    JOIN usuario USING (idusuario)`;

const formatTecnico = (tecnico, id) => {
  return [
    tecnico.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc = acc + `(${id},${curr.idusuario},${curr.precio})`);
    }, ""),
  ];
};

const formatDetalle = (detalle, id) => {
  return [
    detalle.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc =
        acc +
        `(${id},${curr.idconcepto.idconcepto},${curr.precio},${curr.cantidad})`);
    }, ""),
  ];
};

const ActividadService = {
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
      const results = await db.query(query + "WHERE idactividad  = $1", [id]);
      return results.rows[0].rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ master, tecnico, detalle }) => {
    try {
      await db.query("BEGIN");
      const results = await db.query(
        "INSERT INTO actividad( idcliente,idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          master.idcliente,
          master.idcliente_sucursal,
          master.idusuario,
          master.idestadocobro,
          master.solicitante,
          master.comentario,
          master.fecha,
        ]
      );
      const idactividad = results.rows[0].idactividad;
      const actividad_tecnico = formatTecnico(tecnico, idactividad);
      const actividad_detalle = formatDetalle(detalle, idactividad);

      const resultsTecnico = await db.query(
        `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ${actividad_tecnico} RETURNING *`
      );
      const resultsConcepto = await db.query(
        `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ${actividad_detalle} RETURNING *`
      );
      results.rows[0].tecnico = resultsTecnico.rows;
      results.rows[0].detalle = resultsConcepto.rows;
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
  update: async ({ id, master, tecnico, detalle }) => {
    try {
      await db.query("BEGIN");
      const results = await db.query(
        "UPDATE actividad SET idcliente=$2, idcliente_sucursal=$3 idusuario=$4, idestadocobro=$5, solicitante=$6, comentario=$7, fecha=$8 WHERE idactividad = $1 RETURNING *",
        [
          id,
          master.idcliente,
          master.idcliente_sucursal,
          master.idusuario,
          master.idestadocobro,
          master.solicitante,
          master.comentario,
          master.fecha,
        ]
      );
      await db.query(
        "DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1",
        [id]
      );
      await db.query(
        "DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1",
        [id]
      );
      const actividad_tecnico = formatTecnico(tecnico, id);
      const actividad_detalle = formatDetalle(detalle, id);

      const resultsTecnico = await db.query(
        `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ${actividad_tecnico} RETURNING *`
      );
      const resultsConcepto = await db.query(
        `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ${actividad_detalle} RETURNING *`
      );
      results.rows[0].tecnico = resultsTecnico.rows;
      results.rows[0].detalle = resultsConcepto.rows;
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
  delete: async (id) => {
    try {
      await db.query("BEGIN");
      await db.query(
        "DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1",
        [id]
      );
      await db.query(
        "DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1",
        [id]
      );
      const results = await db.query(
        "DELETE FROM actividad WHERE idactividad  = $1",
        [id]
      );
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
};

export default ActividadService;
