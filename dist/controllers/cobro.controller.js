"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cobro = _interopRequireDefault(require("../services/cobro.service"));

var _date = require("../util/date.util");

var CobroController = {
  get: function () {
    var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var params, response;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = {
                idcliente: req.query.cliente !== "undefined" ? req.query.cliente : undefined,
                desde: (0, _date.parse_date)(req.query.desde),
                hasta: (0, _date.parse_date)(req.query.hasta),
                idestadocobro: req.query.estado !== "undefined" ? req.query.estado : undefined
              };
              _context.prev = 1;
              _context.next = 4;
              return _cobro["default"].getAll(params);

            case 4:
              response = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                data: response
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
      var response;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _cobro["default"].getById(req.params.id);

            case 3:
              response = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: response
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
      var response;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (req.body.sucursal.length === 0) {
                req.body.sucursal = [{
                  descripcion: "N/A"
                }];
              }

              _context3.next = 4;
              return _cobro["default"].create(req.body);

            case 4:
              response = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: response
              }));

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(400).json({
                status: 400,
                message: _context3.t0.message
              }));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 8]]);
    }));

    function create(_x5, _x6) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var params, response;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params = {
                fechacobro: (0, _date.current_date)(),
                idusuariocobro: req.decoded.id,
                comentario: req.body.comentario,
                saldocobrado: req.body.saldocobrado,
                retencion: req.body.retencion,
                actividad_cobro: req.body.actividad_cobro,
                idestadocobro: req.body.idestadocobro.idestadocobro,
                id: req.params.id
              };
              _context4.prev = 1;
              _context4.next = 4;
              return _cobro["default"].update(params);

            case 4:
              response = _context4.sent;
              return _context4.abrupt("return", res.status(200).json({
                status: 200,
                data: response
              }));

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).json({
                status: 400,
                message: _context4.t0.message
              }));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 8]]);
    }));

    function update(_x7, _x8) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var response;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _cobro["default"]["delete"](req.params.id);

            case 3:
              response = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: response
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
var _default = CobroController;
exports["default"] = _default;