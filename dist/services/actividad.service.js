"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../db"));

var query = "SELECT \n        json_build_object(\n          'idactividad', idactividad, \n          'idcliente', json_build_object(\n            'idcliente', cliente.idcliente, \n            'razonsocial', cliente.razonsocial\n          ), \n          'idcliente_sucursal', json_build_object(\n            'idcliente_sucursal',cli_suc.idcliente_sucursal,\n            'descripcion', cli_suc.descripcion\n          ),\n          'idusuario', json_build_object(\n            'idusuario', usuario.idusuario, \n            'nombre', usuario.nombre\n          ), \n          'idestadocobro', json_build_object(\n            'idestadocobro', estadocobro.idestadocobro, \n            'descripcion', estadocobro.descripcion\n          ), \n          'solicitante', solicitante, \n          'comentario', comentario, \n          'fecha', to_char(fecha, 'DD-MM-YYYY'), \n          'tecnico', (\n            SELECT json_agg(\n                json_build_object(\n                      'idusuario', tec.idusuario,\n                      'nombre', usu.nombre,\n                      'precio', tec.precio\n                )\n            )\n            FROM    actividad_tecnico_detalle as tec\n            JOIN    usuario as usu ON tec.idusuario = usu.idusuario\n            WHERE   idactividad = actividad.idactividad\n          ), \n          'detalle', (\n            SELECT json_agg(\n                json_build_object(\n                    'idconcepto', json_build_object(\n                        'idconcepto', conc.idconcepto,\n                        'descripcion', conc.descripcion\n                    ), \n                    'precio', det.precio, \n                    'cantidad', det.cantidad\n                )\n            )\n            FROM    actividad_concepto_detalle AS det\n            JOIN    concepto as conc ON det.idconcepto = conc.idconcepto\n            WHERE   idactividad = actividad.idactividad\n\n          )) as rows\n    FROM actividad\n    JOIN cliente USING (idcliente)\n    JOIN cliente_sucursal as cli_suc \n      ON  actividad.idcliente = cli_suc.idcliente\n      AND actividad.idcliente_sucursal = cli_suc.idcliente_sucursal\n    JOIN estadocobro USING (idestadocobro)\n    JOIN usuario USING (idusuario)";

var formatTecnico = function formatTecnico(tecnico, id) {
  return [tecnico.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idusuario, ",").concat(curr.precio, ")");
  }, "")];
};

var formatDetalle = function formatDetalle(detalle, id) {
  return [detalle.reduce(function (acc, curr) {
    if (acc !== "") acc = acc + ",";
    return acc = acc + "(".concat(id, ",").concat(curr.idconcepto.idconcepto, ",").concat(curr.precio, ",").concat(curr.cantidad, ")");
  }, "")];
};

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
              return _db["default"].query(query + "WHERE idactividad  = $1", [id]);

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
      var master, tecnico, detalle, results, idactividad, actividad_tecnico, actividad_detalle, resultsTecnico, resultsConcepto;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              master = _ref.master, tecnico = _ref.tecnico, detalle = _ref.detalle;
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query("BEGIN");

            case 4:
              _context3.next = 6;
              return _db["default"].query("INSERT INTO actividad( idcliente,idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha]);

            case 6:
              results = _context3.sent;
              idactividad = results.rows[0].idactividad;
              actividad_tecnico = formatTecnico(tecnico, idactividad);
              actividad_detalle = formatDetalle(detalle, idactividad);
              _context3.next = 12;
              return _db["default"].query("INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ".concat(actividad_tecnico, " RETURNING *"));

            case 12:
              resultsTecnico = _context3.sent;
              _context3.next = 15;
              return _db["default"].query("INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ".concat(actividad_detalle, " RETURNING *"));

            case 15:
              resultsConcepto = _context3.sent;
              results.rows[0].tecnico = resultsTecnico.rows;
              results.rows[0].detalle = resultsConcepto.rows;
              _context3.next = 20;
              return _db["default"].query("COMMIT");

            case 20:
              return _context3.abrupt("return", results.rows);

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3["catch"](1);
              _context3.next = 27;
              return _db["default"].query("ROLLBACK");

            case 27:
              throw _context3.t0;

            case 28:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 23]]);
    }));

    function create(_x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
      var id, master, tecnico, detalle, results, actividad_tecnico, actividad_detalle, resultsTecnico, resultsConcepto;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = _ref2.id, master = _ref2.master, tecnico = _ref2.tecnico, detalle = _ref2.detalle;
              _context4.prev = 1;
              _context4.next = 4;
              return _db["default"].query("BEGIN");

            case 4:
              _context4.next = 6;
              return _db["default"].query("UPDATE actividad SET idcliente=$2, idcliente_sucursal=$3 idusuario=$4, idestadocobro=$5, solicitante=$6, comentario=$7, fecha=$8 WHERE idactividad = $1 RETURNING *", [id, master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha]);

            case 6:
              results = _context4.sent;
              _context4.next = 9;
              return _db["default"].query("DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1", [id]);

            case 9:
              _context4.next = 11;
              return _db["default"].query("DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1", [id]);

            case 11:
              actividad_tecnico = formatTecnico(tecnico, id);
              actividad_detalle = formatDetalle(detalle, id);
              _context4.next = 15;
              return _db["default"].query("INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ".concat(actividad_tecnico, " RETURNING *"));

            case 15:
              resultsTecnico = _context4.sent;
              _context4.next = 18;
              return _db["default"].query("INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ".concat(actividad_detalle, " RETURNING *"));

            case 18:
              resultsConcepto = _context4.sent;
              results.rows[0].tecnico = resultsTecnico.rows;
              results.rows[0].detalle = resultsConcepto.rows;
              _context4.next = 23;
              return _db["default"].query("COMMIT");

            case 23:
              return _context4.abrupt("return", results.rows);

            case 26:
              _context4.prev = 26;
              _context4.t0 = _context4["catch"](1);
              _context4.next = 30;
              return _db["default"].query("ROLLBACK");

            case 30:
              throw _context4.t0;

            case 31:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 26]]);
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
              return _db["default"].query("DELETE FROM actividad_tecnico_detalle WHERE idactividad  = $1", [id]);

            case 5:
              _context5.next = 7;
              return _db["default"].query("DELETE FROM actividad_concepto_detalle WHERE idactividad  = $1", [id]);

            case 7:
              _context5.next = 9;
              return _db["default"].query("DELETE FROM actividad WHERE idactividad  = $1", [id]);

            case 9:
              results = _context5.sent;
              _context5.next = 12;
              return _db["default"].query("COMMIT");

            case 12:
              return _context5.abrupt("return", results.rows);

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](0);
              _context5.next = 19;
              return _db["default"].query("ROLLBACK");

            case 19:
              throw _context5.t0;

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 15]]);
    }));

    function _delete(_x4) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = ActividadService;
exports["default"] = _default;