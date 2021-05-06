"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../db"));

var query = "SELECT idformulario, descripcion, permisos FROM formulario";
var FormularioService = {
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
              return _context.abrupt("return", results.rows);

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
  }()
};
var _default = FormularioService;
exports["default"] = _default;