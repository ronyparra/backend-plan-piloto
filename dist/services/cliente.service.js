"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../db"));

var query = "SELECT \n\t    json_build_object(\n\t\t  'idcliente', idcliente,\n\t\t  'razonsocial', razonsocial,\n\t\t  'ruc',  ruc,\n\t\t  'sucursal',(\n\t\t\t  SELECT json_agg(\n\t\t\t\t  json_build_object(\n\t\t\t\t  'idcliente',cli_suc.idcliente,\n\t\t\t\t  'idcliente_sucursal', cli_suc.idcliente_sucursal,\n\t\t\t\t  'descripcion', cli_suc.descripcion,\n\t\t\t\t  'latitud', cli_suc.latitud,\n\t\t\t\t  'longitud', cli_suc.longitud\n\t\t\t\t  )\n\t\t\t  )\n\t\t\t  FROM cliente_sucursal as cli_suc\n\t\t  \tWHERE cli_suc.idcliente = cliente.idcliente\n\t\t  )\n\t  ) as rows\n    FROM cliente";

var formatSucursal = function formatSucursal(sucursal, id) {
  return sucursal.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    var latitud = curr.latitud ? "'".concat(curr.latitud, "'") : null;
    var longitud = curr.longitud ? "'".concat(curr.longitud, "'") : null;
    return acc = acc + "(".concat(id, ",'").concat(curr.descripcion, "',").concat(latitud, ",").concat(longitud, ")");
  }, "");
};

var ClienteService = {
  getAll: function () {
    var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _db["default"].query(query);

            case 3:
              results = _context.sent;
              return _context.abrupt("return", results.rows.map(function (x) {
                return x.rows;
              }));

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
              return _db["default"].query(query + " WHERE idcliente  = $1", [id]);

            case 3:
              results = _context2.sent;
              return _context2.abrupt("return", results.rows[0].rows);

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
      var razonsocial, ruc, sucursal, results, idcliente, detail, resultsDetail;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              razonsocial = _ref.razonsocial, ruc = _ref.ruc, sucursal = _ref.sucursal;
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query("BEGIN");

            case 4:
              _context3.next = 6;
              return _db["default"].query("INSERT INTO cliente(razonsocial, ruc) VALUES ($1, $2) RETURNING *", [razonsocial, ruc]);

            case 6:
              results = _context3.sent;
              idcliente = results.rows[0].idcliente;
              detail = formatSucursal(sucursal, idcliente);
              _context3.next = 11;
              return _db["default"].query("INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES ".concat(detail, " RETURNING *"));

            case 11:
              resultsDetail = _context3.sent;
              results.rows[0].sucursal = resultsDetail.rows;
              _context3.next = 15;
              return _db["default"].query("COMMIT");

            case 15:
              return _context3.abrupt("return", results.rows);

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](1);
              _context3.next = 22;
              return _db["default"].query("ROLLBACK");

            case 22:
              throw _context3.t0;

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 18]]);
    }));

    function create(_x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
      var razonsocial, ruc, sucursal, id, results, detail, resultsDetail;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              razonsocial = _ref2.razonsocial, ruc = _ref2.ruc, sucursal = _ref2.sucursal, id = _ref2.id;
              _context4.prev = 1;
              _context4.next = 4;
              return _db["default"].query("BEGIN");

            case 4:
              _context4.next = 6;
              return _db["default"].query("UPDATE cliente SET razonsocial = $1, ruc = $2 WHERE idcliente = $3 RETURNING *", [razonsocial, ruc, id]);

            case 6:
              results = _context4.sent;
              _context4.next = 9;
              return _db["default"].query("DELETE FROM cliente_sucursal WHERE idcliente  = $1", [id]);

            case 9:
              detail = formatSucursal(sucursal, id);
              _context4.next = 12;
              return _db["default"].query("INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES ".concat(detail, " RETURNING *"));

            case 12:
              resultsDetail = _context4.sent;
              results.rows[0].sucursal = resultsDetail.rows;
              _context4.next = 16;
              return _db["default"].query("COMMIT");

            case 16:
              return _context4.abrupt("return", results.rows);

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](1);
              _context4.next = 23;
              return _db["default"].query("ROLLBACK");

            case 23:
              throw _context4.t0;

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 19]]);
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
              return _db["default"].query("BEGIN");

            case 3:
              _context5.next = 5;
              return _db["default"].query("DELETE FROM cliente_sucursal WHERE idcliente  = $1", [id]);

            case 5:
              _context5.next = 7;
              return _db["default"].query("DELETE FROM cliente WHERE idcliente  = $1", [id]);

            case 7:
              results = _context5.sent;
              _context5.next = 10;
              return _db["default"].query("COMMIT");

            case 10:
              return _context5.abrupt("return", results.rows);

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              _context5.next = 17;
              return _db["default"].query("ROLLBACK");

            case 17:
              throw _context5.t0;

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 13]]);
    }));

    function _delete(_x4) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = ClienteService;
exports["default"] = _default;