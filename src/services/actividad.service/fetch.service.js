import db from "../../db";

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
    JOIN usuario USING (idusuario) `;

export const getAll = async (filters) => {
  try {
    const results = await db.query(query + generateFilter(filters));
    return results.rows.map((x) => x.rows);
  } catch (e) {
    throw e;
  }
};
export const getById = async (id) => {
  try {
    const results = await db.query(query + "WHERE idactividad  = $1", [id]);
    return results.rows[0].rows;
  } catch (e) {
    throw e;
  }
};

const generateFilter = ({idcliente, desde, hasta, idestadocobro}) => {
  const filterCliente = idcliente ? `cliente.idcliente = ${idcliente}` : null;
  const filterFecha = `fecha BETWEEN '${desde}'::date AND '${hasta}'::date`;
  const filterEstado = idestadocobro ? `idestadocobro = ${idestadocobro}` : null;
  const filter  = `WHERE ${ filterFecha } ${ filterCliente ? `AND ${filterCliente}` : '' } ${filterEstado ? `AND ${filterEstado}` : ''}`
  return filter;
};


