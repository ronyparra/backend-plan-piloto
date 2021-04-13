"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatUpdateCobro = void 0;

var formatUpdateCobro = function formatUpdateCobro(detalle, idestadocobro) {
  return detalle.reduce(function (acc, curr) {
    return acc = acc + "UPDATE actividad SET idestadocobro = ".concat(idestadocobro, " WHERE idactividad = ").concat(curr.idactividad, "; \n");
  }, '');
};

exports.formatUpdateCobro = formatUpdateCobro;