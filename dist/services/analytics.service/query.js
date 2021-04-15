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
  cliente: "SELECT \n  json_build_object(\n    'idcliente',idcliente,\n    'cliente', razonsocial,\n    'cantidad',(SELECT COUNT(a.idactividad) FROM actividad AS a WHERE a.idcliente =  actividad.idcliente),\n    'guarani',  SUM(precio*cantidad) FILTER (WHERE (moneda.idmoneda = 1)) ,\n    'dolar',SUM(precio*cantidad)  FILTER (WHERE (moneda.idmoneda = 2))\n  ) as rows\n  FROM actividad\n    JOIN cliente USING (idcliente)\n    JOIN actividad_concepto_detalle USING (idactividad)\n    JOIN moneda USING (idmoneda)\n    WHERE \tfecha BETWEEN $1::date AND  $2::date\n  GROUP BY idcliente, razonsocial\n  ",
  concepto: "SELECT\n  json_build_object(\n      'idconcepto',concepto.idconcepto,\n        'concepto',concepto.descripcion,\n        'cantidad',SUM(acd.cantidad),\n        'guarani',SUM(acd.precio*acd.cantidad) FILTER (WHERE (moneda.idmoneda = 1)),\n      'dolar',SUM(acd.precio*acd.cantidad) FILTER (WHERE (moneda.idmoneda = 2))\n  ) as rows\n  FROM actividad\n  JOIN actividad_concepto_detalle AS acd USING (idactividad)\n  JOIN concepto ON concepto.idconcepto = acd.idconcepto\n  JOIN moneda ON moneda.idmoneda = acd.idmoneda\n  WHERE \tfecha BETWEEN $1::date AND  $2::date\n  GROUP BY concepto.idconcepto, concepto.descripcion"
};
var _default = query;
exports["default"] = _default;