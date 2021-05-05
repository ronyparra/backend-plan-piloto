"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pendiente = _interopRequireDefault(require("../services/pendiente.service"));

var _date = require("../util/date.util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var PendienteController = {
  getDashboard: function () {
    var _getDashboard = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _pendiente["default"].getDashboard(req.decoded.id);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                data: response
              }));

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: _context.t0.message
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function getDashboard(_x, _x2) {
      return _getDashboard.apply(this, arguments);
    }

    return getDashboard;
  }(),
  get: function () {
    var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var pendiente;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _pendiente["default"].getAll();

            case 3:
              pendiente = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: pendiente
              }));

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(400).json({
                status: 400,
                message: _context2.t0.message
              }));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    function get(_x3, _x4) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  changeStatus: function () {
    var _changeStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var actividad;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _pendiente["default"].changeStatus(req.body);

            case 3:
              actividad = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).json({
                status: 400,
                message: _context3.t0.message
              }));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function changeStatus(_x5, _x6) {
      return _changeStatus.apply(this, arguments);
    }

    return changeStatus;
  }(),
  getById: function () {
    var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var pendiente;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _pendiente["default"].getById(req.params.id);

            case 3:
              pendiente = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: pendiente
              }));

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).json({
                status: 400,
                message: _context4.t0.message
              }));

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function getById(_x7, _x8) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var insert, pendiente;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              insert = {
                idtipo_pendiente: req.body.idtipo_pendiente.idtipo_pendiente,
                fecha: (0, _date.parse_date)(req.body.fecha),
                descripcion: req.body.descripcion,
                pendiente_tecnico: req.body.pendiente_tecnico
              };
              _context5.next = 4;
              return _pendiente["default"].create(_objectSpread({}, insert));

            case 4:
              pendiente = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: pendiente
              }));

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: _context5.t0.message
              }));

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 8]]);
    }));

    function create(_x9, _x10) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var _update2, pendiente;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _update2 = {
                idtipo_pendiente: req.body.idtipo_pendiente.idtipo_pendiente,
                fecha: (0, _date.parse_date)(req.body.fecha),
                descripcion: req.body.descripcion,
                pendiente_tecnico: req.body.pendiente_tecnico
              };
              _context6.next = 4;
              return _pendiente["default"].update(_objectSpread(_objectSpread({}, _update2), {}, {
                id: req.params.id
              }));

            case 4:
              pendiente = _context6.sent;
              return _context6.abrupt("return", res.status(200).json({
                status: 200,
                data: pendiente
              }));

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(400).json({
                status: 400,
                message: _context6.t0.message
              }));

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 8]]);
    }));

    function update(_x11, _x12) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var pendiente;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _pendiente["default"].delet(req.params.id);

            case 3:
              pendiente = _context7.sent;
              return _context7.abrupt("return", res.status(200).json({
                status: 200,
                data: pendiente
              }));

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", res.status(400).json({
                status: 400,
                message: _context7.t0.message
              }));

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 7]]);
    }));

    function _delete(_x13, _x14) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = PendienteController;
exports["default"] = _default;