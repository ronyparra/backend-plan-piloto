const query = {
  general: `SELECT 
	json_build_object(
		'moneda', moneda.abreviatura,
		'saldo',SUM(precio*cantidad)
	) as rows
    FROM actividad
    JOIN actividad_concepto_detalle USING (idactividad)
    JOIN moneda USING (idmoneda)
    WHERE fecha BETWEEN $1::date AND  $2::date
    GROUP BY moneda.abreviatura;`,
  estado: (condicion)=>`
    SELECT 
    json_build_object(
        'moneda', moneda.abreviatura,
        'saldo', ROUND(SUM(cantidad*precio))
    ) as rows
    FROM 	actividad
    JOIN 	actividad_concepto_detalle USING (idactividad)
    JOIN 	moneda USING (idmoneda)
    WHERE 	fecha BETWEEN $1::date AND  $2::date
    AND		idestadocobro ${condicion} $3
    GROUP BY moneda.abreviatura;
  `,
  pendiente: `SELECT
	json_build_object(
		'tipo',tp.descripcion,
		'registrado', COUNT(idpendiente) FILTER (WHERE 	fecha BETWEEN $1::date AND  $2::date),
		'terminado', COUNT(idpendiente) FILTER (WHERE activo = true AND fecha BETWEEN $1::date AND  $2::date)
	) as rows
  FROM 		pendiente 
  FULL JOIN	tipo_pendiente AS tp USING(idtipo_pendiente)
  GROUP BY 	tp.descripcion`,
  cliente: `WITH cliente_por_moneda AS (
    SELECT 
      idcliente,
      razonsocial,
      moneda.abreviatura as moneda,
      SUM(precio*cantidad) as saldo
    FROM actividad
    JOIN cliente USING (idcliente)
    JOIN actividad_concepto_detalle USING (idactividad)
    JOIN moneda USING (idmoneda)
    WHERE 	fecha BETWEEN $1::date AND  $2::date
    GROUP BY idcliente, razonsocial, moneda.abreviatura
  ),
   count_actividad_moneda AS (
    SELECT 
       idcliente,
      COUNT(idactividad) AS cantidad
    FROM actividad
    WHERE 	fecha BETWEEN $1::date AND  $2::date
    GROUP BY idcliente
  )
  SELECT 
    json_build_object(
      'idcliente', idcliente,
      'cliente', razonsocial,
      'cant_actividad', (
          SELECT 	cantidad 
          FROM 	count_actividad_moneda as ca  
          WHERE 	ca.idcliente = cliente_por_moneda.idcliente),
      'detalle',
      (SELECT 
      json_agg(
        json_build_object(
          'moneda', cm.moneda,
          'saldo', cm.saldo
        )
      )
      FROM cliente_por_moneda as cm
      WHERE cm.idcliente = cliente_por_moneda.idcliente
      )
    ) AS rows
  FROM cliente_por_moneda 
  GROUP BY idcliente, razonsocial
  LIMIT 2
  `
};
export default query;