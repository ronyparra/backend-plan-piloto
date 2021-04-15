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
  pendiente: "SELECT\n\tjson_build_object(\n\t\t'tipo',tp.descripcion,\n\t\t'registrado', COUNT(idpendiente) FILTER (WHERE \tfecha BETWEEN $1::date AND  $2::date),\n\t\t'terminado', COUNT(idpendiente) FILTER (WHERE activo = true AND fecha BETWEEN $1::date AND  $2::date)\n\t) as rows\n  FROM \t\tpendiente \n  FULL JOIN\ttipo_pendiente AS tp USING(idtipo_pendiente)\n  GROUP BY \ttp.descripcion",
  cliente: "WITH cliente_por_moneda AS (\n    SELECT \n      idcliente,\n      razonsocial,\n      moneda.abreviatura as moneda,\n      SUM(precio*cantidad) as saldo\n    FROM actividad\n    JOIN cliente USING (idcliente)\n    JOIN actividad_concepto_detalle USING (idactividad)\n    JOIN moneda USING (idmoneda)\n    WHERE \tfecha BETWEEN $1::date AND  $2::date\n    GROUP BY idcliente, razonsocial, moneda.abreviatura\n  ),\n   count_actividad_moneda AS (\n    SELECT \n       idcliente,\n      COUNT(idactividad) AS cantidad\n    FROM actividad\n    WHERE \tfecha BETWEEN $1::date AND  $2::date\n    GROUP BY idcliente\n  )\n  SELECT \n    json_build_object(\n      'idcliente', idcliente,\n      'cliente', razonsocial,\n      'cant_actividad', (\n          SELECT \tcantidad \n          FROM \tcount_actividad_moneda as ca  \n          WHERE \tca.idcliente = cliente_por_moneda.idcliente),\n      'detalle',\n      (SELECT \n      json_agg(\n        json_build_object(\n          'moneda', cm.moneda,\n          'saldo', cm.saldo\n        )\n      )\n      FROM cliente_por_moneda as cm\n      WHERE cm.idcliente = cliente_por_moneda.idcliente\n      )\n    ) AS rows\n  FROM cliente_por_moneda \n  GROUP BY idcliente, razonsocial\n  LIMIT 2\n  "
};
var _default = query;
exports["default"] = _default;