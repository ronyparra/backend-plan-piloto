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
      var periodoAnterior, desde, hasta, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              periodoAnterior = (0, _date.substract_days)((0, _date.parse_date)(req.query.desde), 1);
              desde = (0, _date.parse_date)(req.query.desde);
              hasta = (0, _date.parse_date)(req.query.hasta);
              _context.prev = 3;
              _context.next = 6;
              return _analytics["default"].getSaldoGeneral('1900-10-10', periodoAnterior);

            case 6:
              _context.t0 = _context.sent;
              _context.t1 = {
                title: "Periodo Anterior",
                color: "pink lighten-5",
                detalle: _context.t0
              };
              _context.next = 10;
              return _analytics["default"].getSaldoGeneral(desde, hasta);

            case 10:
              _context.t2 = _context.sent;
              _context.t3 = {
                title: "Periodo Actual",
                detalle: _context.t2
              };
              _context.next = 14;
              return _analytics["default"].getSaldoPorEstado(desde, hasta, '=', 3);

            case 14:
              _context.t4 = _context.sent;
              _context.t5 = {
                title: "Cobrado",
                detalle: _context.t4
              };
              _context.next = 18;
              return _analytics["default"].getSaldoPorEstado(desde, hasta, '!=', 3);

            case 18:
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

            case 24:
              _context.prev = 24;
              _context.t8 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: _context.t8.message
              }));

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 24]]);
    }));

    function getActividad(_x, _x2) {
      return _getActividad.apply(this, arguments);
    }

    return getActividad;
  }()
};
var _default = analyticsController;
exports["default"] = _default;