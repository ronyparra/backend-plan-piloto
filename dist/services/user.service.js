"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.formatRolUsuarioInsert = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireWildcard(require("../db"));

var query = "\nSELECT \n\tjson_build_object(\n\t\t'idusuario',usuario.idusuario,\n\t\t'username',username,\n\t\t'nombre',nombre,\n\t\t'apellido', apellido,\n\t\t'usuario_rol_detalle', (\n\t\t\tSELECT json_agg(\n\t\t\t\t\trol.idusuario_rol\n\t\t\t)\n\t\t\tFROM usuario_rol_detalle AS userd\n\t\t\tJOIN usuario_rol AS rol USING (idusuario_rol)\n\t\t\tWHERE userd.idusuario = usuario.idusuario\n\t\t)\n\t) AS rows\nFROM usuario\n";

var formatRolUsuarioInsert = function formatRolUsuarioInsert(usuario_rol_detalle, id) {
  var detalle = usuario_rol_detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ", \n";
    return acc = acc + "(".concat(id, ",").concat(curr, ")");
  }, "");
  return "INSERT INTO usuario_rol_detalle(idusuario, idusuario_rol) VALUES \n".concat(detalle, ";");
};

exports.formatRolUsuarioInsert = formatRolUsuarioInsert;
var UserService = {
  getAll: function () {
    var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _db["default"].query(query);

            case 2:
              results = _context.sent;
              return _context.abrupt("return", results.rows.map(function (x) {
                return x.rows;
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
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
              _context2.next = 2;
              return _db["default"].query(query + " WHERE idusuario  = $1", [id]);

            case 2:
              results = _context2.sent;
              return _context2.abrupt("return", results.rows[0].rows);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getById(_x) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  getByUsername: function () {
    var _getByUsername = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref) {
      var username, results;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = _ref.username;
              _context3.next = 3;
              return _db["default"].query("SELECT idusuario, username, password, nombre, apellido, precio FROM usuario WHERE username  LIKE $1", [username]);

            case 3:
              results = _context3.sent;
              return _context3.abrupt("return", results.rows[0]);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getByUsername(_x2) {
      return _getByUsername.apply(this, arguments);
    }

    return getByUsername;
  }(),
  create: function () {
    var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
      var username, password, nombre, apellido, usuario_rol_detalle, client, results, idusuario;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              username = _ref2.username, password = _ref2.password, nombre = _ref2.nombre, apellido = _ref2.apellido, usuario_rol_detalle = _ref2.usuario_rol_detalle;
              _context4.next = 3;
              return _db.pool.connect();

            case 3:
              client = _context4.sent;
              _context4.prev = 4;
              _context4.next = 7;
              return client.query("BEGIN");

            case 7:
              _context4.next = 9;
              return client.query("INSERT INTO usuario (username,password,nombre,apellido) VALUES ($1, $2,$3,$4) RETURNING *", [username, password, nombre, apellido]);

            case 9:
              results = _context4.sent;
              idusuario = results.rows[0].idusuario;
              _context4.next = 13;
              return client.query(formatRolUsuarioInsert(usuario_rol_detalle, idusuario));

            case 13:
              _context4.next = 15;
              return client.query("COMMIT");

            case 15:
              return _context4.abrupt("return", results.rows);

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](4);
              _context4.next = 22;
              return client.query("ROLLBACK");

            case 22:
              throw _context4.t0;

            case 23:
              _context4.prev = 23;
              client.release();
              return _context4.finish(23);

            case 26:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[4, 18, 23, 26]]);
    }));

    function create(_x3) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref3) {
      var username, password, nombre, apellido, usuario_rol_detalle, id, client, results;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              username = _ref3.username, password = _ref3.password, nombre = _ref3.nombre, apellido = _ref3.apellido, usuario_rol_detalle = _ref3.usuario_rol_detalle, id = _ref3.id;
              _context5.next = 3;
              return _db.pool.connect();

            case 3:
              client = _context5.sent;
              _context5.prev = 4;
              _context5.next = 7;
              return client.query("BEGIN");

            case 7:
              _context5.next = 9;
              return client.query("UPDATE usuario SET username = $1,nombre = $2,apellido = $3 WHERE idusuario = $4 RETURNING *", [username, nombre, apellido, id]);

            case 9:
              results = _context5.sent;

              if (!password) {
                _context5.next = 13;
                break;
              }

              _context5.next = 13;
              return client.query("UPDATE usuario SET password = $1 WHERE idusuario = $2 RETURNING *", [password, id]);

            case 13:
              _context5.next = 15;
              return client.query("DELETE FROM usuario_rol_detalle WHERE idusuario = $1", [id]);

            case 15:
              _context5.next = 17;
              return client.query(formatRolUsuarioInsert(usuario_rol_detalle, id));

            case 17:
              _context5.next = 19;
              return client.query("COMMIT");

            case 19:
              return _context5.abrupt("return", results.rows);

            case 22:
              _context5.prev = 22;
              _context5.t0 = _context5["catch"](4);
              _context5.next = 26;
              return client.query("ROLLBACK");

            case 26:
              throw _context5.t0;

            case 27:
              _context5.prev = 27;
              client.release();
              return _context5.finish(27);

            case 30:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[4, 22, 27, 30]]);
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
              return client.query("DELETE FROM usuario_rol_detalle WHERE idusuario = $1", [id]);

            case 8:
              _context6.next = 10;
              return client.query("DELETE FROM usuario WHERE idusuario  = $1", [id]);

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
var _default = UserService;
exports["default"] = _default;