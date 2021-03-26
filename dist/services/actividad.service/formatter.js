"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHANGE_ACTIVIDAD_STATUS = exports.UPDATE_ACTIVIDAD = exports.UPDATE_PENDIENTE = exports.DELETE_ACTIVIDAD = exports.DELETE_DET_PENDIENTE = exports.DELETE_DET_TECNICO = exports.DELETE_DET_CONCEPTO = exports.INSERT_DET_ACT_COBRO = exports.INSERT_CLIENTE_COBRO = exports.INSERT_DET_PENDIENTE = exports.INSERT_DET_CONCEPTO = exports.INSERT_DET_TECNICO = exports.INSERT_ACTIVIDAD = exports.calcularTotal = exports.formatMaster = void 0;

var _date = require("../../util/date.util");

var formatMaster = function formatMaster(body) {
  body.fecha = (0, _date.parse_date)(body.fecha);
  return {
    idcliente: body.idcliente.idcliente,
    idcliente_sucursal: body.idcliente_sucursal.idcliente_sucursal,
    idusuario: body.idusuario.idusuario,
    idestadocobro: 1,
    solicitante: body.solicitante,
    comentario: body.comentario,
    fecha: body.fecha
  };
};

exports.formatMaster = formatMaster;

var calcularTotal = function calcularTotal(detalle) {
  return detalle.reduce(function (acc, curr) {
    var subtotal = curr.detalle.reduce(function (acc1, curr1) {
      return acc1 = acc1 + curr1.cantidad * curr1.precio;
    }, 0);
    return acc = acc + subtotal;
  }, 0);
};

exports.calcularTotal = calcularTotal;

var INSERT_ACTIVIDAD = function INSERT_ACTIVIDAD(idcliente, idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) {
  return "INSERT INTO actividad( idcliente,idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES (".concat(idcliente, ", ").concat(idcliente_sucursal, ", ").concat(idusuario, ", ").concat(idestadocobro, ", '").concat(solicitante, "', '").concat(comentario, "', '").concat(fecha, "') RETURNING *");
};

exports.INSERT_ACTIVIDAD = INSERT_ACTIVIDAD;

var INSERT_DET_TECNICO = function INSERT_DET_TECNICO(detalle, id) {
  var tecnico = [detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idusuario, ")");
  }, "")];
  return "INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES ".concat(tecnico, " RETURNING * ;");
};

exports.INSERT_DET_TECNICO = INSERT_DET_TECNICO;

var INSERT_DET_CONCEPTO = function INSERT_DET_CONCEPTO(detalle, id) {
  var conceptos = [detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idconcepto.idconcepto, ",").concat(curr.precio, ",").concat(curr.cantidad, ",").concat(curr.idmoneda.idmoneda, ")");
  }, "")];
  return "INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad, idmoneda)VALUES ".concat(conceptos, " RETURNING * ;");
};

exports.INSERT_DET_CONCEPTO = INSERT_DET_CONCEPTO;

var INSERT_DET_PENDIENTE = function INSERT_DET_PENDIENTE(idactividad, idpendiente) {
  return "INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES (".concat(idactividad, ", ").concat(idpendiente, ") RETURNING *");
};

exports.INSERT_DET_PENDIENTE = INSERT_DET_PENDIENTE;

var INSERT_CLIENTE_COBRO = function INSERT_CLIENTE_COBRO(descripcion, idcliente, fecha, idusuario, total, idmoneda) {
  return "INSERT INTO cliente_cobro(\n      idestadocobro, descripcion, idcliente, fechainsert, fechacobro, idusuarioinsert, idusuariocobro, comentario, saldocobrado, saldoacobrar, retencion, idmoneda)\n    VALUES (2, '".concat(descripcion, "', ").concat(idcliente, ", '").concat(fecha, "', null, ").concat(idusuario, ", null, null, 0, ").concat(total, ", false, ").concat(idmoneda, ") RETURNING *");
};

exports.INSERT_CLIENTE_COBRO = INSERT_CLIENTE_COBRO;

var INSERT_DET_ACT_COBRO = function INSERT_DET_ACT_COBRO(detalle, id) {
  var actividad = [detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idactividad, ")");
  }, "")];
  return "INSERT INTO actividad_cobro(idcliente_cobro, idactividad) VALUES ".concat(actividad, " RETURNING *;");
};

exports.INSERT_DET_ACT_COBRO = INSERT_DET_ACT_COBRO;

var DELETE_DET_CONCEPTO = function DELETE_DET_CONCEPTO(id) {
  return "DELETE FROM actividad_concepto_detalle WHERE idactividad  = ".concat(id, " RETURNING *;");
};

exports.DELETE_DET_CONCEPTO = DELETE_DET_CONCEPTO;

var DELETE_DET_TECNICO = function DELETE_DET_TECNICO(id) {
  return "DELETE FROM actividad_tecnico_detalle WHERE idactividad  = ".concat(id, " RETURNING *;");
};

exports.DELETE_DET_TECNICO = DELETE_DET_TECNICO;

var DELETE_DET_PENDIENTE = function DELETE_DET_PENDIENTE(id) {
  return "DELETE FROM actividad_pendiente WHERE idactividad  = ".concat(id, " RETURNING *;");
};

exports.DELETE_DET_PENDIENTE = DELETE_DET_PENDIENTE;

var DELETE_ACTIVIDAD = function DELETE_ACTIVIDAD(id) {
  return "DELETE FROM actividad WHERE idactividad  = ".concat(id, " RETURNING *;");
};

exports.DELETE_ACTIVIDAD = DELETE_ACTIVIDAD;

var UPDATE_PENDIENTE = function UPDATE_PENDIENTE(idpendiente, activo) {
  return "UPDATE pendiente SET activo = ".concat(activo, " WHERE idpendiente = ").concat(idpendiente, " RETURNING *;");
};

exports.UPDATE_PENDIENTE = UPDATE_PENDIENTE;

var UPDATE_ACTIVIDAD = function UPDATE_ACTIVIDAD(id, idcliente, idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) {
  return "UPDATE actividad SET idcliente=".concat(idcliente, ", idcliente_sucursal=").concat(idcliente_sucursal, ", idusuario=").concat(idusuario, ", idestadocobro=").concat(idestadocobro, ", solicitante='").concat(solicitante, "', comentario='").concat(comentario, "', fecha='").concat(fecha, "' WHERE idactividad = ").concat(id, " RETURNING *");
};

exports.UPDATE_ACTIVIDAD = UPDATE_ACTIVIDAD;

var CHANGE_ACTIVIDAD_STATUS = function CHANGE_ACTIVIDAD_STATUS(detalle, id) {
  return detalle.reduce(function (acc, curr) {
    return acc = acc + "UPDATE actividad SET  idestadocobro= ".concat(id, "  WHERE idactividad =  ").concat(curr.idactividad, ";\n");
  }, "");
};

exports.CHANGE_ACTIVIDAD_STATUS = CHANGE_ACTIVIDAD_STATUS;