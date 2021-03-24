"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcularTotal = exports.formatActividadCobro = exports.formatActividadChangeStatus = exports.formatDetalle = exports.formatTecnico = void 0;

var formatTecnico = function formatTecnico(tecnico, id) {
  return [tecnico.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idusuario, ")");
  }, "")];
};

exports.formatTecnico = formatTecnico;

var formatDetalle = function formatDetalle(detalle, id) {
  return [detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idconcepto.idconcepto, ",").concat(curr.precio, ",").concat(curr.cantidad, ",").concat(curr.idmoneda.idmoneda, ")");
  }, "")];
};

exports.formatDetalle = formatDetalle;

var formatActividadChangeStatus = function formatActividadChangeStatus(detalle, id) {
  return detalle.reduce(function (acc, curr) {
    return acc = acc + "UPDATE actividad SET  idestadocobro= ".concat(id, "  WHERE idactividad =  ").concat(curr.idactividad, ";\n");
  }, "");
};

exports.formatActividadChangeStatus = formatActividadChangeStatus;

var formatActividadCobro = function formatActividadCobro(detalle, id) {
  return [detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idactividad, ")");
  }, "")];
};

exports.formatActividadCobro = formatActividadCobro;

var calcularTotal = function calcularTotal(detalle) {
  return detalle.reduce(function (acc, curr) {
    var subtotal = curr.detalle.reduce(function (acc1, curr1) {
      return acc1 = acc1 + curr1.cantidad * curr1.precio;
    }, 0);
    return acc = acc + subtotal;
  }, 0);
};

exports.calcularTotal = calcularTotal;