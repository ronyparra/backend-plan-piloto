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
              console.log(req.query.cliente);
              params = {
                idcliente: req.query.cliente !== "undefined" ? req.query.cliente : undefined,
                desde: (0, _date.parse_date)(req.query.desde),
                hasta: (0, _date.parse_date)(req.query.hasta),
                idestadocobro: req.query.estado !== "undefined" ? req.query.estado : undefined
              };
              _context.prev = 2;
              _context.next = 5;
              return _actividad["default"].getAll(params);

            case 5:
              actividad = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: _context.t0.message
              }));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
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
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var master, tecnico, detalle, actividad;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              master = formatMaster(req.body);
              tecnico = req.body.tecnico;
              detalle = req.body.detalle;
              _context3.prev = 3;
              _context3.next = 6;
              return _actividad["default"].create({
                master: master,
                tecnico: tecnico,
                detalle: detalle
              });

            case 6:
              actividad = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              return _context3.abrupt("return", res.status(400).json({
                status: 400,
                message: _context3.t0.message
              }));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 10]]);
    }));

    function create(_x5, _x6) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var master, tecnico, detalle, actividad;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              master = formatMaster(req.body);
              tecnico = req.body.tecnico;
              detalle = req.body.detalle;
              _context4.prev = 3;
              _context4.next = 6;
              return _actividad["default"].update({
                id: req.params.id,
                master: master,
                tecnico: tecnico,
                detalle: detalle
              });

            case 6:
              actividad = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](3);
              return _context4.abrupt("return", res.status(400).json({
                status: 400,
                message: _context4.t0.message
              }));

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 10]]);
    }));

    function update(_x7, _x8) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var actividad;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _actividad["default"]["delete"](req.params.id);

            case 3:
              actividad = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: actividad
              }));

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: _context5.t0.message
              }));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    function _delete(_x9, _x10) {
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