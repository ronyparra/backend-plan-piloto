"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDetalle = exports.formatTecnico = void 0;

var formatTecnico = function formatTecnico(tecnico, id) {
  return [tecnico.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idusuario, ",").concat(curr.precio, ")");
  }, "")];
};

exports.formatTecnico = formatTecnico;

var formatDetalle = function formatDetalle(detalle, id) {
  return [detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idconcepto.idconcepto, ",").concat(curr.precio, ",").concat(curr.cantidad, ")");
  }, "")];
};

exports.formatDetalle = formatDetalle;