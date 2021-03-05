"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _actividad = _interopRequireDefault(require("../services/actividad.service"));

var _date = require("../util/date.util");

var ActividadController = {
  get: function () {
    var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var params, actividad;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = {
                idcliente: req.query.cliente !== "undefined" ? req.query.cliente : undefined,
                idsucursal: req.query.sucursal !== "undefined" ? req.query.sucursal : undefined,
                desde: (0, _date.parse_date)(req.query.desde),
                hasta: (0, _date.parse_date)(req.query.hasta),
                idestadocobro: req.query.estado !== "undefined" ? req.query.estado : undefined
              };
              _context.prev = 1;
              _context.next = 4;
              return _actividad["default"].getAll(params);

            case 4:
              actividad = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: _context.t0.message
              }));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));

    function get(_x, _x2) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  getById: function () {
    var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var actividad;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _actividad["default"].getById(req.params.id);

            case 3:
              actividad = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
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

    function getById(_x3, _x4) {
      return _getById.apply(this, arguments);
    }

    return getById;
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
              return _actividad["default"].changeStatus(req.body);

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
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var master, tecnico, detalle, actividad_pendiente, actividad;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              master = formatMaster(req.body);
              tecnico = req.body.tecnico;
              detalle = req.body.detalle;
              actividad_pendiente = req.body.actividad_pendiente;
              _context4.prev = 4;
              _context4.next = 7;
              return _actividad["default"].create({
                master: master,
                tecnico: tecnico,
                detalle: detalle,
                actividad_pendiente: actividad_pendiente
              });

            case 7:
              actividad = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](4);
              return _context4.abrupt("return", res.status(400).json({
                status: 400,
                message: _context4.t0.message
              }));

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[4, 11]]);
    }));

    function create(_x7, _x8) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var master, tecnico, detalle, actividad_pendiente, actividad;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              master = formatMaster(req.body);
              tecnico = req.body.tecnico;
              detalle = req.body.detalle;
              actividad_pendiente = req.body.actividad_pendiente;
              _context5.prev = 4;
              _context5.next = 7;
              return _actividad["default"].update({
                id: req.params.id,
                master: master,
                tecnico: tecnico,
                detalle: detalle,
                actividad_pendiente: actividad_pendiente
              });

            case 7:
              actividad = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](4);
              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: _context5.t0.message
              }));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[4, 11]]);
    }));

    function update(_x9, _x10) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var actividad;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _actividad["default"].delet(req.params.id);

            case 3:
              actividad = _context6.sent;
              return _context6.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", res.status(400).json({
                status: 400,
                message: _context6.t0.message
              }));

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 7]]);
    }));

    function _delete(_x11, _x12) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = ActividadController;
exports["default"] = _default;

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