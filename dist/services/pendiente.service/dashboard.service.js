"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDashboard = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var query = "\nSELECT rows FROM (\n\tSELECT\n    json_build_object(\n        'tipo', 'Mis Pendientes',\n        'color', 'red',\n        'icon', 'hail',\n        'detalle', (\n            SELECT \n                json_agg(\n                    json_build_object(\n                    'idpendiente', idpendiente,\n                    'descripcion', descripcion\n                    )\n                ) \n            FROM pendiente_tecnico as pend_t\n            JOIN pendiente USING (idpendiente)\n            WHERE idusuario = $1\n        )\n    ) as rows\n\tUNION ALL\n    SELECT\n    json_build_object(\n        'tipo', tp.descripcion,\n        'color', tp.color,\n        'icon',tp.icon,\n        'detalle', (\n            SELECT \n                json_agg(\n                    json_build_object(\n                    'idpendiente', pt.idpendiente,\n                    'descripcion', pt.descripcion\n                    )\n                ) \n            FROM pendiente as pt WHERE idtipo_pendiente = tp.idtipo_pendiente\n        )\n    ) as rows\n    FROM tipo_pendiente as tp\n\t\n) AS pendientes";

var getDashboard = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(idusuario) {
    var results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query(query, [idusuario]);

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

  return function getDashboard(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getDashboard = getDashboard;