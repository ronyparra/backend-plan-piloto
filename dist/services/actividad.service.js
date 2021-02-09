"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../db"));

var ActividadService = {
  getAll: function () {
    var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _db["default"].query("SELECT * FROM actividad");

            case 3:
              results = _context.sent;
              return _context.abrupt("return", results.rows);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function getAll() {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  getById: function () {
    var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
      var results;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _db["default"].query("SELECT * FROM actividad WHERE idactividad  = $1", [id]);

            case 3:
              results = _context2.sent;
              return _context2.abrupt("return", results.rows);

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    function getById(_x) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref) {
      var master, detailTecnico, detailConcepto, results, idactividad, resultsTecnico, resultsConcepto;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              master = _ref.master, detailTecnico = _ref.detailTecnico, detailConcepto = _ref.detailConcepto;
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query("INSERT INTO actividad( idcliente, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [master.idcliente, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha]);

            case 4:
              results = _context3.sent;
              idactividad = results.rows[0].idactividad;
              detailTecnico.map(function (d) {
                d.idactividad = idactividad;
              });
              detailConcepto.map(function (c) {
                c.idactividad - idactividad;
              });
              _context3.next = 10;
              return _db["default"].query("INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ".concat(detailTecnico, " RETURNING *"));

            case 10:
              resultsTecnico = _context3.sent;
              _context3.next = 13;
              return _db["default"].query("INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ".concat(detailConcepto, " RETURNING *"));

            case 13:
              resultsConcepto = _context3.sent;
              results.rows[0].tecnico = resultsTecnico.rows;
              results.rows[0].detalle = resultsConcepto.rows;
              return _context3.abrupt("return", results.rows);

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](1);
              throw _context3.t0;

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 19]]);
    }));

    function create(_x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
      var razonsocial, ruc, results;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              razonsocial = _ref2.razonsocial, ruc = _ref2.ruc;
              _context4.prev = 1;
              _context4.next = 4;
              return _db["default"].query("UPDATE actividad SET razonsocial = $1, ruc = $2 RETURNING *", [razonsocial, ruc]);

            case 4:
              results = _context4.sent;
              return _context4.abrupt("return", results.rows);

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              throw _context4.t0;

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 8]]);
    }));

    function update(_x3) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
      var results;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _db["default"].query("DELETE FROM actividad WHERE idactividad  = $1", [id]);

            case 3:
              results = _context5.sent;
              return _context5.abrupt("return", results.rows);

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    function _delete(_x4) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = ActividadService;
exports["default"] = _default;