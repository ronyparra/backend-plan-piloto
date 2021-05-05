"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _analytics = _interopRequireDefault(require("../services/analytics.service"));

var _date = require("../util/date.util");

var analyticsController = {
  getActividad: function () {
    var _getActividad = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var desde, hasta, diffDesdeHasta, hastaAnterior, desdeAnterior, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              diffDesdeHasta = (0, _date.calc_diff_days)(hasta, desde);
              hastaAnterior = (0, _date.substract_days)(desde, 1);
              desdeAnterior = (0, _date.substract_days)(hastaAnterior, diffDesdeHasta);
              _context.next = 8;
              return _analytics["default"].getSaldoGeneral(desdeAnterior, hastaAnterior);

            case 8:
              _context.t0 = _context.sent;
              _context.t1 = {
                title: "Periodo Anterior",
                color: "pink lighten-5",
                detalle: _context.t0
              };
              _context.next = 12;
              return _analytics["default"].getSaldoGeneral(desde, hasta);

            case 12:
              _context.t2 = _context.sent;
              _context.t3 = {
                title: "Periodo Actual",
                detalle: _context.t2
              };
              _context.next = 16;
              return _analytics["default"].getSaldoPorEstado(desde, hasta, "=", 3);

            case 16:
              _context.t4 = _context.sent;
              _context.t5 = {
                title: "Cobrado",
                detalle: _context.t4
              };
              _context.next = 20;
              return _analytics["default"].getSaldoPorEstado(desde, hasta, "!=", 3);

            case 20:
              _context.t6 = _context.sent;
              _context.t7 = {
                title: "Por Cobrar",
                detalle: _context.t6
              };
              data = [_context.t1, _context.t3, _context.t5, _context.t7];
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 26:
              _context.prev = 26;
              _context.t8 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: _context.t8.message
              }));

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 26]]);
    }));

    function getActividad(_x, _x2) {
      return _getActividad.apply(this, arguments);
    }

    return getActividad;
  }(),
  getPendientes: function () {
    var _getPendientes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var desde, hasta, diffDesdeHasta, hastaAnterior, desdeAnterior, data;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              diffDesdeHasta = (0, _date.calc_diff_days)(hasta, desde);
              hastaAnterior = (0, _date.substract_days)(desde, 1);
              desdeAnterior = (0, _date.substract_days)(hastaAnterior, diffDesdeHasta);
              _context2.next = 8;
              return _analytics["default"].getPendientes(desdeAnterior, hastaAnterior);

            case 8:
              _context2.t0 = _context2.sent;
              _context2.t1 = {
                title: "Periodo Anterior",
                data: _context2.t0
              };
              _context2.next = 12;
              return _analytics["default"].getPendientes(desde, hasta);

            case 12:
              _context2.t2 = _context2.sent;
              _context2.t3 = {
                title: "Periodo Actual",
                data: _context2.t2
              };
              data = [_context2.t1, _context2.t3];
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 18:
              _context2.prev = 18;
              _context2.t4 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).json({
                status: 400,
                message: _context2.t4.message
              }));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 18]]);
    }));

    function getPendientes(_x3, _x4) {
      return _getPendientes.apply(this, arguments);
    }

    return getPendientes;
  }(),
  getCliente: function () {
    var _getCliente = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var desde, hasta, data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              _context3.next = 5;
              return _analytics["default"].getCliente(desde, hasta);

            case 5:
              data = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).json({
                status: 400,
                message: _context3.t0.message
              }));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    function getCliente(_x5, _x6) {
      return _getCliente.apply(this, arguments);
    }

    return getCliente;
  }(),
  getConcepto: function () {
    var _getConcepto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var desde, hasta, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              _context4.next = 5;
              return _analytics["default"].getConcepto(desde, hasta);

            case 5:
              data = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).json({
                status: 400,
                message: _context4.t0.message
              }));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9]]);
    }));

    function getConcepto(_x7, _x8) {
      return _getConcepto.apply(this, arguments);
    }

    return getConcepto;
  }(),
  getTecnico: function () {
    var _getTecnico = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var desde, hasta, data;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              _context5.next = 5;
              return _analytics["default"].getTecnico(desde, hasta);

            case 5:
              data = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: _context5.t0.message
              }));

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));

    function getTecnico(_x9, _x10) {
      return _getTecnico.apply(this, arguments);
    }

    return getTecnico;
  }(),
  getCategoria: function () {
    var _getCategoria = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var desde, hasta, data;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              _context6.next = 5;
              return _analytics["default"].getCategoria(desde, hasta);

            case 5:
              data = _context6.sent;
              return _context6.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(400).json({
                status: 400,
                message: _context6.t0.message
              }));

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }));

    function getCategoria(_x11, _x12) {
      return _getCategoria.apply(this, arguments);
    }

    return getCategoria;
  }(),
  getEstados: function () {
    var _getEstados = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var desde, hasta, old, data;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              old = req.query.old === "true" ? true : false;
              _context7.next = 6;
              return _analytics["default"].getEstados(desde, hasta, old);

            case 6:
              data = _context7.sent;
              return _context7.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(400).json({
                status: 400,
                message: _context7.t0.message
              }));

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 10]]);
    }));

    function getEstados(_x13, _x14) {
      return _getEstados.apply(this, arguments);
    }

    return getEstados;
  }(),
  getCobroTecnico: function () {
    var _getCobroTecnico = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var desde, hasta, data;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              _context8.next = 5;
              return _analytics["default"].getCobroTecnico(desde, hasta);

            case 5:
              data = _context8.sent;
              return _context8.abrupt("return", res.status(200).json({
                status: 200,
                data: data
              }));

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              return _context8.abrupt("return", res.status(400).json({
                status: 400,
                message: _context8.t0.message
              }));

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 9]]);
    }));

    function getCobroTecnico(_x15, _x16) {
      return _getCobroTecnico.apply(this, arguments);
    }

    return getCobroTecnico;
  }()
};
var _default = analyticsController;
exports["default"] = _default;