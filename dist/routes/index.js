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

var _default = {
  auth: _auth["default"],
  user: _user["default"],
  cliente: _cliente["default"],
  concepto: _concepto["default"],
  actividad: _actividad["default"]
};
exports["default"] = _default;