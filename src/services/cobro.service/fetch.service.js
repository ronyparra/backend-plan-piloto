import db from "../../db";

const query = `
SELECT 
 	json_build_object(
  	'idcliente_cobro', idcliente_cobro,
		 'idestadocobro', json_build_object(
            'idestadocobro', estadocobro.idestadocobro, 
            'descripcion', estadocobro.descripcion
          ), 
		'descripcion', cliente_cobro.descripcion,
	 	'idcliente', json_build_object(
			'idcliente', cliente.idcliente,
			'razonsocial', cliente.razonsocial
		),
		'idmoneda', json_build_object(
			'idmoneda', moneda.idmoneda,
			'descripcion', moneda.descripcion,
			'abreviatura', moneda.abreviatura
		),
		'fechainsert', to_char(fechainsert, 'DD-MM-YYYY'),
		'fechacobro', to_char(fechacobro, 'DD-MM-YYYY'),
		'idusuarioinsert', idusuarioinsert,
		'idusuariocobro', idusuariocobro,
		'comentario', comentario,
		'saldocobrado',saldocobrado,
    'saldoacobrar',saldoacobrar,
    'retencion', retencion,
		'actividad_cobro',(
			SELECT json_agg(
				json_build_object(
					'idactividad', act.idactividad
				)
			)
			FROM 	actividad_cobro AS act
			WHERE	act.idcliente_cobro = cliente_cobro.idcliente_cobro
		)
 	)	as rows
FROM public.cliente_cobro
JOIN cliente USING (idcliente)
JOIN estadocobro USING (idestadocobro) 
JOIN moneda USING (idmoneda)
`;

export const getAll = async (filters) => {
  try {
    const results = await db.query(
      query + generateFilter(filters) + " ORDER BY idcliente_cobro ASC"
    );
    return results.rows.map((x) => x.rows);
  } catch (e) {
    throw e;
  }
};
export const getById = async (id) => {
  try {
    const results = await db.query(query + " WHERE idcliente_cobro = $1", [id]);
    return results.rows[0].rows;
  } catch (e) {
    throw e;
  }
};

const generateFilter = ({
  idcliente,
  idusuario,
  desde,
  hasta,
  idestadocobro,
}) => {
  const filterCliente = idcliente ? `cliente.idcliente = ${idcliente}` : null;
  const filterUsuario = idusuario ? `idusuariocobro = ${idusuario}` : null;
  const filterFecha = `fechainsert BETWEEN '${desde}'::date AND '${hasta}'::date`;
  const filterEstado = idestadocobro
    ? `idestadocobro = ${idestadocobro}`
    : null;
  const filter = `WHERE ${filterFecha} ${
    filterCliente ? `AND ${filterCliente}` : ""
  } ${filterEstado ? `AND ${filterEstado}` : ""} ${
    filterUsuario ? `AND ${filterUsuario}` : ""
  } `;
  return filter;
};
