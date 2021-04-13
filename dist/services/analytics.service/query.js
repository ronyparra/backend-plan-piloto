"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var query = {
  general: "SELECT \n\tjson_build_object(\n\t\t'moneda', moneda.abreviatura,\n\t\t'saldo',SUM(precio*cantidad)\n\t) as rows\n    FROM actividad\n    JOIN actividad_concepto_detalle USING (idactividad)\n    JOIN moneda USING (idmoneda)\n    WHERE fecha BETWEEN $1::date AND  $2::date\n    GROUP BY moneda.abreviatura;",
  estado: function estado(condicion) {
    return "\n    SELECT \n    json_build_object(\n        'moneda', moneda.abreviatura,\n        'saldo', ROUND(SUM(cantidad*precio))\n    ) as rows\n    FROM \tactividad\n    JOIN \tactividad_concepto_detalle USING (idactividad)\n    JOIN \tmoneda USING (idmoneda)\n    WHERE \tfecha BETWEEN $1::date AND  $2::date\n    AND\t\tidestadocobro ".concat(condicion, " $3\n    GROUP BY moneda.abreviatura;\n");
  }
};
var _default = query;
exports["default"] = _default;