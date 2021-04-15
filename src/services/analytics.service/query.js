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
  estado: (condicion) => `
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
      moneda.idmoneda as id,
      SUM(precio*cantidad) as saldo
    FROM actividad
    JOIN cliente USING (idcliente)
    JOIN actividad_concepto_detalle USING (idactividad)
    JOIN moneda USING (idmoneda)
    WHERE 	fecha BETWEEN $1::date AND  $2::date
    GROUP BY idcliente, razonsocial, moneda.abreviatura, moneda.idmoneda
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
          'idmoneda', cm.id,
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
  `,
  concepto: `WITH concepto_por_moneda AS (
    SELECT 
      concepto.idconcepto as idconcepto,
      moneda.abreviatura as moneda,
      moneda.idmoneda as id,
      concepto.descripcion as concepto,
      SUM(acd.cantidad) as cantidad,
      SUM(acd.precio*acd.cantidad) as saldo
    FROM actividad
    JOIN actividad_concepto_detalle AS acd USING (idactividad)
    JOIN concepto ON concepto.idconcepto = acd.idconcepto
    JOIN moneda ON moneda.idmoneda = acd.idmoneda
    WHERE 	fecha BETWEEN $1::date AND  $2::date
    GROUP BY concepto.idconcepto, concepto.descripcion, moneda.abreviatura, moneda.idmoneda
  )
  SELECT 
    json_build_object(
      'idconcepto', idconcepto,
      'concepto', concepto,
      'cant_concepto', SUM(cantidad),
      'detalle',
      (SELECT 
      json_agg(
        json_build_object(
          'idmoneda', cm.id,
          'moneda', cm.moneda,
          'saldo', cm.saldo
        )
      )
      FROM concepto_por_moneda as cm
      WHERE cm.idconcepto = concepto_por_moneda.idconcepto
      )
    ) AS rows
  FROM concepto_por_moneda 
  GROUP BY idconcepto, concepto`,
};
export default query;
