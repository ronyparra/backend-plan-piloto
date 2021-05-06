"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = exports.getAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var query = "SELECT \n        json_build_object(\n          'idactividad', idactividad, \n          'idcliente', json_build_object(\n            'idcliente', cliente.idcliente, \n            'razonsocial', cliente.razonsocial\n          ), \n          'idcliente_sucursal', json_build_object(\n            'idcliente_sucursal',cli_suc.idcliente_sucursal,\n            'descripcion', cli_suc.descripcion\n          ),\n          'idusuario', json_build_object(\n            'idusuario', usuario.idusuario, \n            'nombre', usuario.nombre\n          ), \n          'idestadocobro', json_build_object(\n            'idestadocobro', estadocobro.idestadocobro, \n            'descripcion', estadocobro.descripcion\n          ), \n          'solicitante', solicitante, \n          'comentario', comentario, \n          'fecha', to_char(fecha, 'DD-MM-YYYY'), \n          'actividad_pendiente', COALESCE((\n            SELECT json_agg(idpendiente) FROM actividad_pendiente  WHERE   idactividad = actividad.idactividad\n          ),'[]'),\n          'tecnico', (\n            SELECT json_agg(\n                json_build_object(\n                      'idusuario', tec.idusuario,\n                      'nombre', usu.nombre\n                )\n            )\n            FROM    actividad_tecnico_detalle as tec\n            JOIN    usuario as usu ON tec.idusuario = usu.idusuario\n            WHERE   idactividad = actividad.idactividad\n          ), \n          'detalle', (\n            SELECT json_agg(\n                json_build_object(\n                    'idconcepto', json_build_object(\n                        'idconcepto', conc.idconcepto,\n                        'descripcion', conc.descripcion\n                    ), \n                    'idmoneda', json_build_object(\n                      'idmoneda', mon.idmoneda,\n                      'descripcion',\tmon.idmoneda,\n                      'abreviatura', mon.abreviatura\n                    ),\n                    'precio', det.precio, \n                    'cantidad', det.cantidad\n                )\n            )\n            FROM    actividad_concepto_detalle AS det\n            JOIN    concepto as conc ON det.idconcepto = conc.idconcepto\n            JOIN    moneda as mon ON det.idmoneda \t\t= mon.idmoneda\n            WHERE   idactividad = actividad.idactividad\n\n          )) as rows\n    FROM actividad\n    JOIN cliente USING (idcliente)\n    JOIN cliente_sucursal as cli_suc \n      ON  actividad.idcliente = cli_suc.idcliente\n      AND actividad.idcliente_sucursal = cli_suc.idcliente_sucursal\n    JOIN estadocobro USING (idestadocobro)\n    JOIN usuario USING (idusuario) ";

var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filters) {
    var results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query(query + generateFilter(filters) + " ORDER BY idactividad ASC");

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

  return function getAll(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var getById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, dbInstance) {
    var results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!dbInstance) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return dbInstance.query(query + "WHERE idactividad  = $1", [id]);

          case 4:
            results = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.next = 9;
            return _db["default"].query(query + "WHERE idactividad  = $1", [id]);

          case 9:
            results = _context2.sent;

          case 10:
            return _context2.abrupt("return", results.rows[0].rows);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function getById(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getById = getById;

var generateFilter = function generateFilter(_ref3) {
  var idcliente = _ref3.idcliente,
      idsucursal = _ref3.idsucursal,
      desde = _ref3.desde,
      hasta = _ref3.hasta,
      idestadocobro = _ref3.idestadocobro;
  var filterCliente = idcliente ? "cliente.idcliente = ".concat(idcliente) : null;
  var filterSucursal = idsucursal ? "cli_suc.idcliente_sucursal = ".concat(idsucursal) : null;
  var filterFecha = "fecha BETWEEN '".concat(desde, "'::date AND '").concat(hasta, "'::date");
  var filterEstado = idestadocobro ? "idestadocobro = ".concat(idestadocobro) : null;
  var filter = "WHERE ".concat(filterFecha, " ").concat(filterCliente ? "AND ".concat(filterCliente) : "", " ").concat(filterEstado ? "AND ".concat(filterEstado) : "", " ").concat(filterSucursal ? "AND ".concat(filterSucursal) : "");
  return filter;
};