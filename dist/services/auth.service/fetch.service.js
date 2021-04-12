"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPermissionByForm = exports.getPermissionByIdUser = void 0;

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
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].query(query, [iduser]);

          case 3:
            results = _context.sent;
            permissions = JSON.parse(JSON.stringify(results.rows.map(function (x) {
              return x.rows;
            })));
            return _context.abrupt("return", permissions);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getPermissionByIdUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getPermissionByIdUser = getPermissionByIdUser;

var getPermissionByForm = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(iduser, form) {
    var results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _db["default"].query(query + " formulario.descripcion = $2", [iduser, form]);

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

  return function getPermissionByForm(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPermissionByForm = getPermissionByForm;