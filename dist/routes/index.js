"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth.router"));

var _user = _interopRequireDefault(require("./user.router"));

var _cliente = _interopRequireDefault(require("./cliente.router"));

var _concepto = _interopRequireDefault(require("./concepto.router"));

var _actividad = _interopRequireDefault(require("./actividad.router"));

var _pendiente = _interopRequireDefault(require("./pendiente.router"));

var _tipo_pendiente = _interopRequireDefault(require("./tipo_pendiente.router"));

var _estadocobro = _interopRequireDefault(require("./estadocobro.router"));

var _formulario = _interopRequireDefault(require("./formulario.router"));

var _usuario_rol = _interopRequireDefault(require("./usuario_rol.router"));

var _cobro = _interopRequireDefault(require("./cobro.router"));

var _moneda = _interopRequireDefault(require("./moneda.router"));

var _analytics = _interopRequireDefault(require("./analytics.router"));

var _default = {
  auth: _auth["default"],
  user: _user["default"],
  cobro: _cobro["default"],
  moneda: _moneda["default"],
  cliente: _cliente["default"],
  concepto: _concepto["default"],
  analytics: _analytics["default"],
  pendiente: _pendiente["default"],
  actividad: _actividad["default"],
  formulario: _formulario["default"],
  estadocobro: _estadocobro["default"],
  usuario_rol: _usuario_rol["default"],
  tipo_pendiente: _tipo_pendiente["default"]
};
exports["default"] = _default;