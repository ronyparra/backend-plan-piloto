"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var query = {
  general: "SELECT \n\tjson_build_object(\n\t\t'moneda', moneda.abreviatura,\n\t\t'saldo',SUM(precio*cantidad)\n\t) as rows\n    FROM actividad\n    JOIN actividad_concepto_detalle USING (idactividad)\n    JOIN moneda USING (idmoneda)\n    WHERE fecha BETWEEN $1::date AND  $2::date\n    GROUP BY moneda.abreviatura;",
  estado: function estado(condicion) {
    return "\n    SELECT \n    json_build_object(\n        'moneda', moneda.abreviatura,\n        'saldo', ROUND(SUM(cantidad*precio))\n    ) as rows\n    FROM \tactividad\n    JOIN \tactividad_concepto_detalle USING (idactividad)\n    JOIN \tmoneda USING (idmoneda)\n    WHERE \tfecha BETWEEN $1::date AND  $2::date\n    AND\t\tidestadocobro ".concat(condicion, " $3\n    GROUP BY moneda.abreviatura;\n  ");
  },
  pendiente: "SELECT\n\tjson_build_object(\n\t\t'tipo',tp.descripcion,\n\t\t'registrado', COUNT(idpendiente) FILTER (WHERE \tfecha BETWEEN $1::date AND  $2::date),\n\t\t'terminado', COUNT(idpendiente) FILTER (WHERE activo = false AND fecha BETWEEN $1::date AND  $2::date)\n\t) as rows\n  FROM \t\tpendiente \n  FULL JOIN\ttipo_pendiente AS tp USING(idtipo_pendiente)\n  GROUP BY \ttp.descripcion",
  cliente: "SELECT \n  json_build_object(\n    'idcliente',idcliente,\n    'cliente', razonsocial,\n    'cantidad',(SELECT COUNT(a.idactividad) FROM actividad AS a WHERE a.idcliente =  actividad.idcliente),\n    'guarani',  SUM(precio*cantidad) FILTER (WHERE (idmoneda = 1)) ,\n    'dolar',SUM(precio*cantidad)  FILTER (WHERE (idmoneda = 2))\n  ) as rows\n  FROM actividad\n    JOIN cliente USING (idcliente)\n    JOIN actividad_concepto_detalle USING (idactividad)\n    WHERE \tfecha BETWEEN $1::date AND  $2::date\n  GROUP BY idcliente, razonsocial\n  ",
  concepto: "SELECT\n  json_build_object(\n      'idconcepto',concepto.idconcepto,\n      'concepto',concepto.descripcion,\n      'cantidad',SUM(acd.cantidad),\n      'guarani',SUM(acd.precio*acd.cantidad) FILTER (WHERE (acd.idmoneda = 1)),\n      'dolar',SUM(acd.precio*acd.cantidad) FILTER (WHERE (acd.idmoneda = 2))\n  ) as rows\n  FROM actividad\n  JOIN actividad_concepto_detalle AS acd USING (idactividad)\n  JOIN concepto ON concepto.idconcepto = acd.idconcepto\n  WHERE \tfecha BETWEEN $1::date AND  $2::date\n  GROUP BY concepto.idconcepto, concepto.descripcion",
  tecnico: "\n  WITH saldo_usuario AS (\n    WITH count_usuario(cantidad) AS (\n      SELECT \n        COUNT(idusuario) as cantidad,\n        idactividad\n      FROM actividad_tecnico_detalle \n      GROUP BY idactividad\n      ), saldo_guarani (saldo) AS(\n      SELECT \n        SUM(precio * cantidad) as saldo,\n        idactividad\n      FROM actividad_concepto_detalle  \n      WHERE idmoneda = 1\n      GROUP BY idactividad\n      ), saldo_dolar (saldo) AS(\n      SELECT \n        SUM(precio * cantidad) as saldo,\n        idactividad\n      FROM actividad_concepto_detalle  \n      WHERE idmoneda = 2\n      GROUP BY idactividad\n      )\n      SELECT \n      atd.idusuario,\n      (SELECT saldo \n         FROM saldo_guarani\n         WHERE idactividad = atd.idactividad) / \n        (SELECT cantidad \n         FROM count_usuario \n         WHERE idactividad = atd.idactividad) as guarani,\n      (SELECT saldo \n         FROM saldo_dolar\n         WHERE idactividad = atd.idactividad) / \n        (SELECT cantidad \n         FROM count_usuario \n         WHERE idactividad = atd.idactividad) as dolar\n       \n      FROM actividad_tecnico_detalle AS atd\n      JOIN actividad USING(idactividad)\n      WHERE \tfecha BETWEEN $1::date AND  $2::date\n      GROUP BY  atd.idactividad, atd.idusuario\t\n    ) \n      SELECT\n        json_build_object(\n          'id',idusuario,\n          'descripcion',CONCAT(nombre, ' ',apellido),\n          'cantidad',(SELECT COUNT(idusuario) FROM saldo_usuario WHERE idusuario = usuario.idusuario),\n          'guarani',(SELECT SUM(guarani) FROM saldo_usuario WHERE idusuario = usuario.idusuario),\n          'dolar',(SELECT SUM(dolar) FROM saldo_usuario WHERE idusuario = usuario.idusuario)\n        ) AS rows\n      FROM usuario    \n  ",
  categoria: "\n  SELECT \n\tjson_build_object(\n\t\t'id',categoria.idcategoria,\n\t\t'descripcion',categoria.descripcion,\n\t\t'cantidad',COUNT(acd.idconcepto),\n\t\t'guarani',SUM(acd.precio * acd.cantidad) FILTER (WHERE acd.idmoneda = 1),\n\t\t'dolar',SUM(acd.precio * acd.cantidad) FILTER (WHERE acd.idmoneda = 2)\n\t) AS rows\n  FROM actividad\n  JOIN actividad_concepto_detalle AS acd USING(idactividad)\n  JOIN concepto USING (idconcepto)\n  JOIN categoria USING (idcategoria)\n  WHERE \tfecha BETWEEN $1::date AND  $2::date\n  GROUP BY categoria.idcategoria,categoria.descripcion\n  "
};
var _default = query;
exports["default"] = _default;