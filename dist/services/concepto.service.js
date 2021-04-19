"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../db"));

var query = "\nSELECT \n\tjson_build_object(\n\t\t'idconcepto', idconcepto,\n\t\t'descripcion', concepto.descripcion,\n\t\t'precio', precio,\n\t\t'idmoneda', json_build_object(\n\t\t\t'idmoneda', moneda.idmoneda,\n\t\t\t'descripcion', moneda.descripcion,\n\t\t\t'abreviatura', moneda.abreviatura\n\t\t),\n    'idcategoria', json_build_object(\n      'idcategoria', categoria.idcategoria,\n      'descripcion', categoria.descripcion\n    )\n\t) as rows\nFROM concepto\nJOIN moneda USING (idmoneda)\nJOIN categoria USING (idcategoria)\n";
var ConceptoService = {
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
              return _db["default"].query(query + " WHERE idconcepto  = $1", [id]);

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
      var descripcion, precio, idmoneda, idcategoria, results;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              descripcion = _ref.descripcion, precio = _ref.precio, idmoneda = _ref.idmoneda, idcategoria = _ref.idcategoria;
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query("INSERT INTO concepto(descripcion, precio, idmoneda, idcategoria) VALUES ($1, $2, $3, $4) RETURNING *", [descripcion, precio, idmoneda, idcategoria]);

            case 4:
              results = _context3.sent;
              return _context3.abrupt("return", results.rows);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              throw _context3.t0;

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 8]]);
    }));

    function create(_x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref2) {
      var descripcion, precio, idmoneda, idcategoria, id, results;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              descripcion = _ref2.descripcion, precio = _ref2.precio, idmoneda = _ref2.idmoneda, idcategoria = _ref2.idcategoria, id = _ref2.id;
              _context4.prev = 1;
              _context4.next = 4;
              return _db["default"].query("UPDATE concepto SET descripcion = $1, precio = $2, idmoneda = $3, idcategoria = $4 WHERE idconcepto = $5 RETURNING *", [descripcion, precio, idmoneda, idcategoria, id]);

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
              return _db["default"].query("DELETE FROM concepto WHERE idconcepto  = $1", [id]);

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
var _default = ConceptoService;
exports["default"] = _default;