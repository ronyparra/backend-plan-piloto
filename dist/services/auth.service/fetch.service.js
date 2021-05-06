"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPermissionByIdUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var query = "\nSELECT \n\tjson_build_object(\n\t\t'formulario', formulario.descripcion,\n\t\t'permisos', usuario_rol_permiso.permisos\n\t) as rows\nFROM usuario_rol_detalle\nJOIN usuario_rol_permiso \tUSING (idusuario_rol)\nJOIN formulario\t\t\t\tUSING (idformulario)\nJOIN usuario\t\t\t\tUSING (idusuario)\nWHERE idusuario \t\t\t=\t$1\n";

var getPermissionByIdUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(iduser) {
    var results, permissions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _db["default"].query(query, [iduser]);

          case 2:
            results = _context.sent;
            permissions = JSON.parse(JSON.stringify(results.rows.map(function (x) {
              return x.rows;
            })));
            return _context.abrupt("return", permissions);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPermissionByIdUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
/* export const getPermissionByForm = async (iduser, form) => {
  const results = await db.query(query + " formulario.descripcion = $2", [
    iduser,
    form,
  ]);
  return results.rows[0].rows;
}; */


exports.getPermissionByIdUser = getPermissionByIdUser;