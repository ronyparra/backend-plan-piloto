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
		'terminado', COUNT(idpendiente) FILTER (WHERE activo = false AND fecha BETWEEN $1::date AND  $2::date)
	) as rows
  FROM 		pendiente 
  FULL JOIN	tipo_pendiente AS tp USING(idtipo_pendiente)
  GROUP BY 	tp.descripcion`,
  cliente: `SELECT 
  json_build_object(
    'idcliente',idcliente,
    'cliente', razonsocial,
    'cantidad',(SELECT COUNT(a.idactividad) FROM actividad AS a WHERE a.idcliente =  actividad.idcliente),
    'guarani',  SUM(precio*cantidad) FILTER (WHERE (moneda.idmoneda = 1)) ,
    'dolar',SUM(precio*cantidad)  FILTER (WHERE (moneda.idmoneda = 2))
  ) as rows
  FROM actividad
    JOIN cliente USING (idcliente)
    JOIN actividad_concepto_detalle USING (idactividad)
    JOIN moneda USING (idmoneda)
    WHERE 	fecha BETWEEN $1::date AND  $2::date
  GROUP BY idcliente, razonsocial
  `,
  concepto: `SELECT
  json_build_object(
      'idconcepto',concepto.idconcepto,
        'concepto',concepto.descripcion,
        'cantidad',SUM(acd.cantidad),
        'guarani',SUM(acd.precio*acd.cantidad) FILTER (WHERE (moneda.idmoneda = 1)),
      'dolar',SUM(acd.precio*acd.cantidad) FILTER (WHERE (moneda.idmoneda = 2))
  ) as rows
  FROM actividad
  JOIN actividad_concepto_detalle AS acd USING (idactividad)
  JOIN concepto ON concepto.idconcepto = acd.idconcepto
  JOIN moneda ON moneda.idmoneda = acd.idmoneda
  WHERE 	fecha BETWEEN $1::date AND  $2::date
  GROUP BY concepto.idconcepto, concepto.descripcion`,
};
export default query;

