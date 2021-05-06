"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.formatSucursalInsert = exports.formatSucursalUpdate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireWildcard(require("../db"));

var query = "SELECT \n\t    json_build_object(\n\t\t  'idcliente', idcliente,\n\t\t  'razonsocial', razonsocial,\n\t\t  'ruc',  ruc,\n\t\t  'sucursal',(\n\t\t\t  SELECT json_agg(\n\t\t\t\t  json_build_object(\n\t\t\t\t  'idcliente',cli_suc.idcliente,\n\t\t\t\t  'idcliente_sucursal', cli_suc.idcliente_sucursal,\n\t\t\t\t  'descripcion', cli_suc.descripcion,\n\t\t\t\t  'latitud', cli_suc.latitud,\n\t\t\t\t  'longitud', cli_suc.longitud\n\t\t\t\t  )\n\t\t\t  )\n\t\t\t  FROM cliente_sucursal as cli_suc\n\t\t  \tWHERE cli_suc.idcliente = cliente.idcliente\n\t\t  )\n\t  ) as rows\n    FROM cliente";

var formatSucursalDelete = function formatSucursalDelete(sucursal, id) {
  return sucursal.reduce(function (acc, curr) {
    return acc = acc + "DELETE FROM cliente_sucursal WHERE idcliente  = ".concat(id, " AND idcliente_sucursal = ").concat(curr.idcliente_sucursal, "; \n");
  }, "");
};

var formatSucursalUpdate = function formatSucursalUpdate(sucursal, id) {
  return sucursal.reduce(function (acc, curr) {
    var latitud = curr.latitud ? "'".concat(curr.latitud, "'") : null;
    var longitud = curr.longitud ? "'".concat(curr.longitud, "'") : null;
    return acc = acc + "UPDATE cliente_sucursal SET descripcion = '".concat(curr.descripcion, "', latitud = ").concat(latitud, ", longitud = ").concat(longitud, " WHERE idcliente = ").concat(id, " AND idcliente_sucursal = ").concat(curr.idcliente_sucursal, "; \n");
  }, "");
};

exports.formatSucursalUpdate = formatSucursalUpdate;

var formatSucursalInsert = function formatSucursalInsert(sucursal, id) {
  var detalle = sucursal.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ", \n";
    var latitud = curr.latitud ? "'".concat(curr.latitud, "'") : null;
    var longitud = curr.longitud ? "'".concat(curr.longitud, "'") : null;
    return acc = acc + "(".concat(id, ",'").concat(curr.descripcion, "',").concat(latitud, ",").concat(longitud, ")");
  }, "");
  return "INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES \n".concat(detalle, ";");
};

exports.formatSucursalInsert = formatSucursalInsert;
var ClienteService = {
  getSucursalByCliente: function () {
    var _getSucursalByCliente = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(idcliente) {
      var results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _db["default"].query("SELECT idcliente, idcliente_sucursal, descripcion, latitud, longitud\n        FROM cliente_sucursal WHERE idcliente = $1", [idcliente]);

            case 2:
              results = _context.sent;
              return _context.abrupt("return", results.rows);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getSucursalByCliente(_x) {
      return _getSucursalByCliente.apply(this, arguments);
    }

    return getSucursalByCliente;
  }(),
  getAll: function () {
    var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var results;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _db["default"].query(query);

            case 2:
              results = _context2.sent;
              return _context2.abrupt("return", results.rows.map(function (x) {
                return x.rows;
              }));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getAll() {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  getById: function () {
    var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
      var results;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _db["default"].query(query + " WHERE idcliente  = $1", [id]);

            case 2:
              results = _context3.sent;
              return _context3.abrupt("return", results.rows[0].rows);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getById(_x2) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref) {
      var razonsocial, ruc, sucursal, client, results, idcliente, resultsDetail;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              razonsocial = _ref.razonsocial, ruc = _ref.ruc, sucursal = _ref.sucursal;
              _context4.next = 3;
              return _db.pool.connect();

            case 3:
              client = _context4.sent;
              _context4.prev = 4;
              _context4.next = 7;
              return client.query("BEGIN");

            case 7:
              _context4.next = 9;
              return client.query("INSERT INTO cliente(razonsocial, ruc) VALUES ($1, $2) RETURNING *", [razonsocial, ruc]);

            case 9:
              results = _context4.sent;
              idcliente = results.rows[0].idcliente;
              _context4.next = 13;
              return client.query(formatSucursalInsert(sucursal, idcliente));

            case 13:
              resultsDetail = _context4.sent;
              results.rows[0].sucursal = resultsDetail.rows;
              _context4.next = 17;
              return client.query("COMMIT");

            case 17:
              return _context4.abrupt("return", results.rows);

            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](4);
              _context4.next = 24;
              return client.query("ROLLBACK");

            case 24:
              throw _context4.t0;

            case 25:
              _context4.prev = 25;
              client.release();
              return _context4.finish(25);

            case 28:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[4, 20, 25, 28]]);
    }));

    function create(_x3) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref2) {
      var razonsocial, ruc, sucursal, id, client, oldSucursal, inserts, updates, deletes, results;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              razonsocial = _ref2.razonsocial, ruc = _ref2.ruc, sucursal = _ref2.sucursal, id = _ref2.id;
              _context5.next = 3;
              return _db.pool.connect();

            case 3:
              client = _context5.sent;
              _context5.prev = 4;
              _context5.next = 7;
              return client.query("BEGIN");

            case 7:
              _context5.next = 9;
              return ClienteService.getSucursalByCliente(id);

            case 9:
              oldSucursal = _context5.sent;
              inserts = sucursal.filter(function (suc_new) {
                return !suc_new.idcliente_sucursal;
              });
              updates = sucursal.filter(function (suc_new) {
                return suc_new.idcliente_sucursal;
              });
              deletes = oldSucursal.filter(function (suc_old) {
                return !updates.find(function (_ref3) {
                  var idcliente_sucursal = _ref3.idcliente_sucursal;
                  return suc_old.idcliente_sucursal === idcliente_sucursal;
                });
              });
              _context5.next = 15;
              return client.query("UPDATE cliente SET razonsocial = $1, ruc = $2 WHERE idcliente = $3 RETURNING *", [razonsocial, ruc, id]);

            case 15:
              results = _context5.sent;

              if (!(inserts.length > 0)) {
                _context5.next = 19;
                break;
              }

              _context5.next = 19;
              return client.query(formatSucursalInsert(inserts, id));

            case 19:
              if (!(updates.length > 0)) {
                _context5.next = 22;
                break;
              }

              _context5.next = 22;
              return client.query(formatSucursalUpdate(updates, id));

            case 22:
              if (!(deletes.length > 0)) {
                _context5.next = 25;
                break;
              }

              _context5.next = 25;
              return client.query(formatSucursalDelete(deletes, id));

            case 25:
              _context5.next = 27;
              return client.query("COMMIT");

            case 27:
              return _context5.abrupt("return", results.rows);

            case 30:
              _context5.prev = 30;
              _context5.t0 = _context5["catch"](4);
              _context5.next = 34;
              return client.query("ROLLBACK");

            case 34:
              throw _context5.t0;

            case 35:
              _context5.prev = 35;
              client.release();
              return _context5.finish(35);

            case 38:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[4, 30, 35, 38]]);
    }));

    function update(_x4) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  "delete": function () {
    var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
      var client, results;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _db.pool.connect();

            case 2:
              client = _context6.sent;
              _context6.prev = 3;
              _context6.next = 6;
              return client.query("BEGIN");

            case 6:
              _context6.next = 8;
              return client.query("DELETE FROM cliente_sucursal WHERE idcliente  = $1", [id]);

            case 8:
              _context6.next = 10;
              return client.query("DELETE FROM cliente WHERE idcliente  = $1", [id]);

            case 10:
              results = _context6.sent;
              _context6.next = 13;
              return client.query("COMMIT");

            case 13:
              return _context6.abrupt("return", results.rows);

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](3);
              _context6.next = 20;
              return client.query("ROLLBACK");

            case 20:
              throw _context6.t0;

            case 21:
              _context6.prev = 21;
              client.release();
              return _context6.finish(21);

            case 24:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[3, 16, 21, 24]]);
    }));

    function _delete(_x5) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = ClienteService;
exports["default"] = _default;