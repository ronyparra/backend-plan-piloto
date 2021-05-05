"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delet = exports.update = exports.changeStatus = exports.create = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = _interopRequireDefault(require("../../db"));

var _fetch = require("./fetch.service");

var _formatter = require("./formatter");

var _date = require("../../util/date.util");

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var create = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, disabledTransaction) {
    var master, tecnico, detalle, actividad_pendiente, results, idactividad, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            master = _ref.master, tecnico = _ref.tecnico, detalle = _ref.detalle, actividad_pendiente = _ref.actividad_pendiente;
            _context.prev = 1;

            if (disabledTransaction) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return _db["default"].query("BEGIN");

          case 5:
            _context.next = 7;
            return _db["default"].query((0, _formatter.INSERT_ACTIVIDAD)(master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha));

          case 7:
            results = _context.sent;
            idactividad = results.rows[0].idactividad;
            _context.next = 11;
            return _db["default"].query((0, _formatter.INSERT_DET_TECNICO)(tecnico, idactividad));

          case 11:
            resultsTecnico = _context.sent;
            _context.next = 14;
            return _db["default"].query((0, _formatter.INSERT_DET_CONCEPTO)(detalle, idactividad));

          case 14:
            resultsConcepto = _context.sent;

            if (!(actividad_pendiente.length > 0)) {
              _context.next = 20;
              break;
            }

            _context.next = 18;
            return _db["default"].query((0, _formatter.INSERT_DET_PENDIENTE)(idactividad, actividad_pendiente[0]));

          case 18:
            _context.next = 20;
            return _db["default"].query((0, _formatter.UPDATE_PENDIENTE)(actividad_pendiente[0], false));

          case 20:
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;

            if (disabledTransaction) {
              _context.next = 25;
              break;
            }

            _context.next = 25;
            return _db["default"].query("COMMIT");

          case 25:
            return _context.abrupt("return", results.rows);

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](1);

            if (disabledTransaction) {
              _context.next = 33;
              break;
            }

            _context.next = 33;
            return _db["default"].query("ROLLBACK");

          case 33:
            throw _context.t0;

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 28]]);
  }));

  return function create(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;

var changeStatus = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var detalle, idestadocobro, idusuario, descripcion, actividadesSinOrden, _iterator, _step, actividad, detActividadMoneda, _iterator3, _step3, _step3$value, index, detConcepto, execute, results, newActividad, actividadesConOrden, cobrosGenerados, _iterator2, _step2, _actividad, saldoacobrar, _results;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            detalle = _ref3.detalle, idestadocobro = _ref3.idestadocobro, idusuario = _ref3.idusuario, descripcion = _ref3.descripcion;
            actividadesSinOrden = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _db["default"].query("BEGIN");

          case 5:
            _iterator = _createForOfIteratorHelper(detalle);
            _context2.prev = 6;

            _iterator.s();

          case 8:
            if ((_step = _iterator.n()).done) {
              _context2.next = 44;
              break;
            }

            actividad = _step.value;
            detActividadMoneda = ordenarDetActividadPorMoneda(actividad.detalle);

            if (!(detActividadMoneda.length > 1)) {
              _context2.next = 41;
              break;
            }

            _iterator3 = _createForOfIteratorHelper(detActividadMoneda.entries());
            _context2.prev = 13;

            _iterator3.s();

          case 15:
            if ((_step3 = _iterator3.n()).done) {
              _context2.next = 33;
              break;
            }

            _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2), index = _step3$value[0], detConcepto = _step3$value[1];

            if (!(index === 0)) {
              _context2.next = 24;
              break;
            }

            execute = "".concat((0, _formatter.DELETE_DET_CONCEPTO)(actividad.idactividad), " \n              ").concat((0, _formatter.INSERT_DET_CONCEPTO)(detConcepto, actividad.idactividad));
            _context2.next = 21;
            return _db["default"].query(execute);

          case 21:
            actividad.detalle = JSON.parse(JSON.stringify(detConcepto));
            _context2.next = 31;
            break;

          case 24:
            _context2.next = 26;
            return create({
              master: (0, _formatter.formatMaster)(actividad),
              tecnico: actividad.tecnico,
              detalle: detConcepto,
              actividad_pendiente: actividad.actividad_pendiente
            }, true);

          case 26:
            results = _context2.sent;
            _context2.next = 29;
            return (0, _fetch.getById)(results[0].idactividad);

          case 29:
            newActividad = _context2.sent;
            actividadesSinOrden.push(_objectSpread(_objectSpread({}, newActividad), {}, {
              moneda: detConcepto[0].moneda
            }));

          case 31:
            _context2.next = 15;
            break;

          case 33:
            _context2.next = 38;
            break;

          case 35:
            _context2.prev = 35;
            _context2.t0 = _context2["catch"](13);

            _iterator3.e(_context2.t0);

          case 38:
            _context2.prev = 38;

            _iterator3.f();

            return _context2.finish(38);

          case 41:
            actividadesSinOrden.push(actividad);

          case 42:
            _context2.next = 8;
            break;

          case 44:
            _context2.next = 49;
            break;

          case 46:
            _context2.prev = 46;
            _context2.t1 = _context2["catch"](6);

            _iterator.e(_context2.t1);

          case 49:
            _context2.prev = 49;

            _iterator.f();

            return _context2.finish(49);

          case 52:
            actividadesConOrden = ordenarActividadPorMoneda(actividadesSinOrden);
            cobrosGenerados = [];
            _iterator2 = _createForOfIteratorHelper(actividadesConOrden);
            _context2.prev = 55;

            _iterator2.s();

          case 57:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 70;
              break;
            }

            _actividad = _step2.value;
            saldoacobrar = (0, _formatter.calcularTotal)(_actividad);
            _context2.next = 62;
            return _db["default"].query((0, _formatter.CHANGE_ACTIVIDAD_STATUS)(_actividad, idestadocobro));

          case 62:
            _context2.next = 64;
            return _db["default"].query((0, _formatter.INSERT_CLIENTE_COBRO)(descripcion, _actividad[0].idcliente.idcliente, (0, _date.current_date)(), idusuario, saldoacobrar, _actividad[0].moneda));

          case 64:
            _results = _context2.sent;
            cobrosGenerados.push(_results.rows[0]);
            _context2.next = 68;
            return _db["default"].query((0, _formatter.INSERT_DET_ACT_COBRO)(_actividad, _results.rows[0].idcliente_cobro));

          case 68:
            _context2.next = 57;
            break;

          case 70:
            _context2.next = 75;
            break;

          case 72:
            _context2.prev = 72;
            _context2.t2 = _context2["catch"](55);

            _iterator2.e(_context2.t2);

          case 75:
            _context2.prev = 75;

            _iterator2.f();

            return _context2.finish(75);

          case 78:
            _context2.next = 80;
            return _db["default"].query("COMMIT");

          case 80:
            return _context2.abrupt("return", cobrosGenerados);

          case 83:
            _context2.prev = 83;
            _context2.t3 = _context2["catch"](2);

            _db["default"].query("ROLLBACK");

            throw _context2.t3;

          case 87:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 83], [6, 46, 49, 52], [13, 35, 38, 41], [55, 72, 75, 78]]);
  }));

  return function changeStatus(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.changeStatus = changeStatus;

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
    var id, master, tecnico, detalle, actividad_pendiente, results, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref5.id, master = _ref5.master, tecnico = _ref5.tecnico, detalle = _ref5.detalle, actividad_pendiente = _ref5.actividad_pendiente;
            _context3.prev = 1;
            _context3.next = 4;
            return _db["default"].query("BEGIN");

          case 4:
            _context3.next = 6;
            return _db["default"].query((0, _formatter.UPDATE_ACTIVIDAD)(id, master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha));

          case 6:
            results = _context3.sent;
            _context3.next = 9;
            return _db["default"].query((0, _formatter.DELETE_DET_TECNICO)(id));

          case 9:
            _context3.next = 11;
            return _db["default"].query((0, _formatter.DELETE_DET_CONCEPTO)(id));

          case 11:
            _context3.next = 13;
            return _db["default"].query((0, _formatter.DELETE_DET_PENDIENTE)(id));

          case 13:
            _context3.next = 15;
            return _db["default"].query((0, _formatter.INSERT_DET_TECNICO)(tecnico, id));

          case 15:
            resultsTecnico = _context3.sent;
            _context3.next = 18;
            return _db["default"].query((0, _formatter.INSERT_DET_CONCEPTO)(detalle, id));

          case 18:
            resultsConcepto = _context3.sent;

            if (!(actividad_pendiente.length > 0)) {
              _context3.next = 22;
              break;
            }

            _context3.next = 22;
            return _db["default"].query((0, _formatter.INSERT_DET_PENDIENTE)(id, actividad_pendiente[0]));

          case 22:
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;
            _context3.next = 26;
            return _db["default"].query("COMMIT");

          case 26:
            return _context3.abrupt("return", results.rows);

          case 29:
            _context3.prev = 29;
            _context3.t0 = _context3["catch"](1);
            _context3.next = 33;
            return _db["default"].query("ROLLBACK");

          case 33:
            throw _context3.t0;

          case 34:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 29]]);
  }));

  return function update(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var pendiente, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _db["default"].query("BEGIN");

          case 3:
            _context4.next = 5;
            return _db["default"].query((0, _formatter.DELETE_DET_TECNICO)(id));

          case 5:
            _context4.next = 7;
            return _db["default"].query((0, _formatter.DELETE_DET_CONCEPTO)(id));

          case 7:
            _context4.next = 9;
            return _db["default"].query((0, _formatter.DELETE_DET_PENDIENTE)(id));

          case 9:
            pendiente = _context4.sent;

            if (!(pendiente.rows.length > 0)) {
              _context4.next = 13;
              break;
            }

            _context4.next = 13;
            return _db["default"].query((0, _formatter.UPDATE_PENDIENTE)(pendiente.rows[0].idpendiente, true));

          case 13:
            _context4.next = 15;
            return _db["default"].query((0, _formatter.DELETE_ACTIVIDAD)(id));

          case 15:
            results = _context4.sent;
            _context4.next = 18;
            return _db["default"].query("COMMIT");

          case 18:
            return _context4.abrupt("return", results.rows);

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](0);
            _context4.next = 25;
            return _db["default"].query("ROLLBACK");

          case 25:
            throw _context4.t0;

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 21]]);
  }));

  return function delet(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.delet = delet;

var ordenarDetActividadPorMoneda = function ordenarDetActividadPorMoneda(detalle) {
  detalle.map(function (concepto) {
    concepto.moneda = concepto.idmoneda.idmoneda;
  });
  var detReordenado = orderByKey(detalle, "moneda");
  return Object.entries(detReordenado).map(function (entry) {
    return entry[1];
  });
};

var ordenarActividadPorMoneda = function ordenarActividadPorMoneda(actividades) {
  actividades.map(function (actividad) {
    actividad.moneda = actividad.moneda ? actividad.moneda : actividad.detalle[0].moneda;
  });
  var actividadReordenado = orderByKey(actividades, "moneda");
  return Object.entries(actividadReordenado).map(function (entry) {
    return entry[1];
  });
};

var orderByKey = function orderByKey(list, key) {
  return list.reduce(function (hash, _ref8) {
    var value = _ref8[key],
        rest = (0, _objectWithoutProperties2["default"])(_ref8, [key].map(_toPropertyKey));
    return _objectSpread(_objectSpread({}, hash), {}, (0, _defineProperty2["default"])({}, value, (hash[value] || []).concat(_objectSpread((0, _defineProperty2["default"])({}, key, value), rest))));
  }, {});
};