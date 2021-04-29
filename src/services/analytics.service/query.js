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
    'guarani',  SUM(precio*cantidad) FILTER (WHERE (idmoneda = 1)) ,
    'dolar',SUM(precio*cantidad)  FILTER (WHERE (idmoneda = 2))
  ) as rows
  FROM actividad
    JOIN cliente USING (idcliente)
    JOIN actividad_concepto_detalle USING (idactividad)
    WHERE 	fecha BETWEEN $1::date AND  $2::date
  GROUP BY idcliente, razonsocial
  `,
  concepto: `SELECT
  json_build_object(
      'idconcepto',concepto.idconcepto,
      'concepto',concepto.descripcion,
      'cantidad',SUM(acd.cantidad),
      'guarani',SUM(acd.precio*acd.cantidad) FILTER (WHERE (acd.idmoneda = 1)),
      'dolar',SUM(acd.precio*acd.cantidad) FILTER (WHERE (acd.idmoneda = 2))
  ) as rows
  FROM actividad
  JOIN actividad_concepto_detalle AS acd USING (idactividad)
  JOIN concepto ON concepto.idconcepto = acd.idconcepto
  WHERE 	fecha BETWEEN $1::date AND  $2::date
  GROUP BY concepto.idconcepto, concepto.descripcion`,
  tecnico: `
  WITH saldo_usuario AS (
    WITH count_usuario(cantidad) AS (
      SELECT 
        COUNT(idusuario) as cantidad,
        idactividad
      FROM actividad_tecnico_detalle 
      GROUP BY idactividad
      ), saldo_guarani (saldo) AS(
		SELECT 
        SUM(acd.precio * cantidad) as saldo,
        idactividad
      	FROM actividad_concepto_detalle AS acd 
	  	JOIN concepto USING (idconcepto)
      	WHERE acd.idmoneda = 1
	  	AND idcategoria = 1
      	GROUP BY idactividad
      ), saldo_dolar (saldo) AS(
		SELECT 
 		SUM(acd.precio * cantidad) as saldo,
  		idactividad
		FROM actividad_concepto_detalle AS acd
		JOIN concepto USING (idconcepto)
		WHERE acd.idmoneda = 2
		AND	concepto.idcategoria = 1
		GROUP BY idactividad
      )
      SELECT 
      atd.idusuario,
      (SELECT saldo 
         FROM saldo_guarani
         WHERE idactividad = atd.idactividad) / 
        (SELECT cantidad 
         FROM count_usuario 
         WHERE idactividad = atd.idactividad) as guarani,
      (SELECT saldo 
         FROM saldo_dolar
         WHERE idactividad = atd.idactividad) / 
        (SELECT cantidad 
         FROM count_usuario 
         WHERE idactividad = atd.idactividad) as dolar
       
      FROM actividad_tecnico_detalle AS atd
      JOIN actividad USING(idactividad)
      WHERE 	fecha BETWEEN $1::date AND  $2::date
      GROUP BY  atd.idactividad, atd.idusuario	
    ) 
      SELECT
        json_build_object(
          'id',idusuario,
          'descripcion',CONCAT(nombre, ' ',apellido),
          'cantidad',(SELECT COUNT(idusuario) FROM saldo_usuario WHERE idusuario = usuario.idusuario),
          'guarani',(SELECT SUM(guarani) FROM saldo_usuario WHERE idusuario = usuario.idusuario),
          'dolar',(SELECT SUM(dolar) FROM saldo_usuario WHERE idusuario = usuario.idusuario)
        ) AS rows
      FROM usuario    
  `,
  categoria: `
  SELECT 
	json_build_object(
		'id',categoria.idcategoria,
		'descripcion',categoria.descripcion,
		'cantidad',COUNT(acd.idconcepto),
		'guarani',SUM(acd.precio * acd.cantidad) FILTER (WHERE acd.idmoneda = 1),
		'dolar',SUM(acd.precio * acd.cantidad) FILTER (WHERE acd.idmoneda = 2)
	) AS rows
  FROM actividad
  JOIN actividad_concepto_detalle AS acd USING(idactividad)
  JOIN concepto USING (idconcepto)
  JOIN categoria USING (idcategoria)
  WHERE 	fecha BETWEEN $1::date AND  $2::date
  GROUP BY categoria.idcategoria,categoria.descripcion
  `,
  cobro: `
  SELECT 	
	json_build_object(
		'id', 			idusuariocobro,
    'cantidad',		COUNT(idcliente_cobro),
		'descripcion', 	CONCAT(usuario.nombre,' ',usuario.apellido),
		'guarani',		SUM(saldocobrado) FILTER (WHERE idmoneda = 1),
		'rguarani',		SUM((SELECT * FROM calcularRetencion(retencion,saldoacobrar) WHERE idmoneda =1)),
		'dolar',		SUM(saldocobrado) FILTER (WHERE idmoneda = 2),
		'rdolar', 		SUM((SELECT * FROM calcularRetencion(retencion,saldoacobrar)WHERE idmoneda =2))
	) as rows
  FROM cliente_cobro 
  JOIN moneda USING (idmoneda)
  JOIN usuario ON usuario.idusuario = idusuariocobro
  AND fechacobro BETWEEN $1::date AND $2::date
  WHERE idestadocobro = 3
  GROUP BY usuario.nombre, usuario.apellido, idusuariocobro;
  `,
  estados:(old)=> `
  WITH saldoestado  AS (
	  SELECT 
		  	idestadocobro,
			  moneda.idmoneda,
			  SUM(precio*cantidad) AS saldo
	  FROM 	actividad
	  JOIN 	actividad_concepto_detalle USING (idactividad)
	  JOIN 	moneda USING (idmoneda)
    ${old ? 'WHERE 	fecha <  $2::date' : 'WHERE 	fecha BETWEEN $1::date AND  $2::date'}
  	GROUP BY moneda.abreviatura, moneda.idmoneda, idestadocobro
  ), saldocobrado  AS (
	  SELECT 
			idestadocobro,
			moneda.idmoneda,
			SUM(precio*cantidad) AS saldo
	FROM 	actividad
	JOIN 	actividad_concepto_detalle USING (idactividad)
	JOIN 	moneda USING (idmoneda)
	WHERE 	fecha BETWEEN $1::date AND  $2::date
	GROUP BY moneda.abreviatura, moneda.idmoneda, idestadocobro
  )
  SELECT * FROM (
	SELECT 
		json_build_object(
        ${old ? "'mensaje', '(Con Anteriores)',": ""}
        'id', estadocobro.idestadocobro,
  			'descripcion', 		estadocobro.descripcion,
  			'guarani',	(SELECT 	saldo 
		 			FROM 		saldoestado 
		 			WHERE 		idestadocobro = estadocobro.idestadocobro 
		 			AND 		idmoneda = 1),
  			'dolar',	(SELECT 	saldo 
			 		FROM 		saldoestado 
		 			WHERE 		idestadocobro = estadocobro.idestadocobro 
		 			AND 		idmoneda = 2)
		) AS rows
	FROM estadocobro WHERE idestadocobro != 3
	UNION ALL
	SELECT 
		json_build_object(
        ${old ? "'mensaje', '(Actual)',": ""}
        'id', estadocobro.idestadocobro,
  			'descripcion',  	estadocobro.descripcion,
  			'guarani',	(SELECT 	saldo 
					FROM 		saldocobrado 
					WHERE 		idestadocobro = estadocobro.idestadocobro 
					AND 		idmoneda = 1),
  			'dolar',	(SELECT 	saldo 
		 			FROM 		saldocobrado 
		 			WHERE 		idestadocobro = estadocobro.idestadocobro 
		 			AND 		idmoneda = 2)
		) AS rows
	FROM estadocobro WHERE idestadocobro = 3
  ) AS estados
  `,
};

export default query;
