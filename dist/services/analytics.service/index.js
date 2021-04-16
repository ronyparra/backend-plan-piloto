"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fetch = require("./fetch.service");

var _default = {
  getSaldoPorEstado: _fetch.getSaldoPorEstado,
  getSaldoGeneral: _fetch.getSaldoGeneral,
  getPendientes: _fetch.getPendientes,
  getConcepto: _fetch.getConcepto,
  getTecnico: _fetch.getTecnico,
  getCliente: _fetch.getCliente
};
exports["default"] = _default;