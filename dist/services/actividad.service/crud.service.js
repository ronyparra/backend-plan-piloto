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

var _db = require("../../db");

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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, disabledTransaction, dbInstance) {
    var master, tecnico, detalle, actividad_pendiente, client, results, idactividad, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            master = _ref.master, tecnico = _ref.tecnico, detalle = _ref.detalle, actividad_pendiente = _ref.actividad_pendiente;

            if (disabledTransaction) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return _db.pool.connect();

          case 4:
            _context.t0 = _context.sent;
            _context.next = 8;
            break;

          case 7:
            _context.t0 = dbInstance;

          case 8:
            client = _context.t0;
            _context.prev = 9;

            if (disabledTransaction) {
              _context.next = 13;
              break;
            }

            _context.next = 13;
            return client.query("BEGIN");

          case 13:
            _context.next = 15;
            return client.query((0, _formatter.INSERT_ACTIVIDAD)(master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha));

          case 15:
            results = _context.sent;
            idactividad = results.rows[0].idactividad;
            _context.next = 19;
            return client.query((0, _formatter.INSERT_DET_TECNICO)(tecnico, idactividad));

          case 19:
            resultsTecnico = _context.sent;
            _context.next = 22;
            return client.query((0, _formatter.INSERT_DET_CONCEPTO)(detalle, idactividad));

          case 22:
            resultsConcepto = _context.sent;

            if (!(actividad_pendiente.length > 0)) {
              _context.next = 28;
              break;
            }

            _context.next = 26;
            return client.query((0, _formatter.INSERT_DET_PENDIENTE)(idactividad, actividad_pendiente[0]));

          case 26:
            _context.next = 28;
            return client.query((0, _formatter.UPDATE_PENDIENTE)(actividad_pendiente[0], false));

          case 28:
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;

            if (disabledTransaction) {
              _context.next = 33;
              break;
            }

            _context.next = 33;
            return client.query("COMMIT");

          case 33:
            return _context.abrupt("return", results.rows);

          case 36:
            _context.prev = 36;
            _context.t1 = _context["catch"](9);

            if (disabledTransaction) {
              _context.next = 41;
              break;
            }

            _context.next = 41;
            return client.query("ROLLBACK");

          case 41:
            throw _context.t1;

          case 42:
            _context.prev = 42;

            if (disabledTransaction) {
              _context.next = 46;
              break;
            }

            _context.next = 46;
            return client.release();

          case 46:
            return _context.finish(42);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 36, 42, 47]]);
  }));

  return function create(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;

var changeStatus = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var detalle, idestadocobro, idusuario, descripcion, client, actividadesSinOrden, _iterator, _step, actividad, detActividadMoneda, _iterator3, _step3, _step3$value, index, detConcepto, execute, results, newActividad, actividadesConOrden, cobrosGenerados, _iterator2, _step2, _actividad, saldoacobrar, _results;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            detalle = _ref3.detalle, idestadocobro = _ref3.idestadocobro, idusuario = _ref3.idusuario, descripcion = _ref3.descripcion;
            _context2.next = 3;
            return _db.pool.connect();

          case 3:
            client = _context2.sent;
            actividadesSinOrden = [];
            _context2.prev = 5;
            _context2.next = 8;
            return client.query("BEGIN");

          case 8:
            _iterator = _createForOfIteratorHelper(detalle);
            _context2.prev = 9;

            _iterator.s();

          case 11:
            if ((_step = _iterator.n()).done) {
              _context2.next = 47;
              break;
            }

            actividad = _step.value;
            detActividadMoneda = ordenarDetActividadPorMoneda(actividad.detalle);

            if (!(detActividadMoneda.length > 1)) {
              _context2.next = 44;
              break;
            }

            _iterator3 = _createForOfIteratorHelper(detActividadMoneda.entries());
            _context2.prev = 16;

            _iterator3.s();

          case 18:
            if ((_step3 = _iterator3.n()).done) {
              _context2.next = 36;
              break;
            }

            _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2), index = _step3$value[0], detConcepto = _step3$value[1];

            if (!(index === 0)) {
              _context2.next = 27;
              break;
            }

            execute = "".concat((0, _formatter.DELETE_DET_CONCEPTO)(actividad.idactividad), " \n              ").concat((0, _formatter.INSERT_DET_CONCEPTO)(detConcepto, actividad.idactividad));
            _context2.next = 24;
            return client.query(execute);

          case 24:
            actividad.detalle = JSON.parse(JSON.stringify(detConcepto));
            _context2.next = 34;
            break;

          case 27:
            _context2.next = 29;
            return create({
              master: (0, _formatter.formatMaster)(actividad),
              tecnico: actividad.tecnico,
              detalle: detConcepto,
              actividad_pendiente: actividad.actividad_pendiente
            }, true, client);

          case 29:
            results = _context2.sent;
            _context2.next = 32;
            return (0, _fetch.getById)(results[0].idactividad, client);

          case 32:
            newActividad = _context2.sent;
            actividadesSinOrden.push(_objectSpread(_objectSpread({}, newActividad), {}, {
              moneda: detConcepto[0].moneda
            }));

          case 34:
            _context2.next = 18;
            break;

          case 36:
            _context2.next = 41;
            break;

          case 38:
            _context2.prev = 38;
            _context2.t0 = _context2["catch"](16);

            _iterator3.e(_context2.t0);

          case 41:
            _context2.prev = 41;

            _iterator3.f();

            return _context2.finish(41);

          case 44:
            actividadesSinOrden.push(actividad);

          case 45:
            _context2.next = 11;
            break;

          case 47:
            _context2.next = 52;
            break;

          case 49:
            _context2.prev = 49;
            _context2.t1 = _context2["catch"](9);

            _iterator.e(_context2.t1);

          case 52:
            _context2.prev = 52;

            _iterator.f();

            return _context2.finish(52);

          case 55:
            actividadesConOrden = ordenarActividadPorMoneda(actividadesSinOrden);
            cobrosGenerados = [];
            _iterator2 = _createForOfIteratorHelper(actividadesConOrden);
            _context2.prev = 58;

            _iterator2.s();

          case 60:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 73;
              break;
            }

            _actividad = _step2.value;
            saldoacobrar = (0, _formatter.calcularTotal)(_actividad);
            _context2.next = 65;
            return client.query((0, _formatter.CHANGE_ACTIVIDAD_STATUS)(_actividad, idestadocobro));

          case 65:
            _context2.next = 67;
            return client.query((0, _formatter.INSERT_CLIENTE_COBRO)(descripcion, _actividad[0].idcliente.idcliente, (0, _date.current_date)(), idusuario, saldoacobrar, _actividad[0].moneda));

          case 67:
            _results = _context2.sent;
            cobrosGenerados.push(_results.rows[0]);
            _context2.next = 71;
            return client.query((0, _formatter.INSERT_DET_ACT_COBRO)(_actividad, _results.rows[0].idcliente_cobro));

          case 71:
            _context2.next = 60;
            break;

          case 73:
            _context2.next = 78;
            break;

          case 75:
            _context2.prev = 75;
            _context2.t2 = _context2["catch"](58);

            _iterator2.e(_context2.t2);

          case 78:
            _context2.prev = 78;

            _iterator2.f();

            return _context2.finish(78);

          case 81:
            _context2.next = 83;
            return client.query("COMMIT");

          case 83:
            return _context2.abrupt("return", cobrosGenerados);

          case 86:
            _context2.prev = 86;
            _context2.t3 = _context2["catch"](5);
            _context2.next = 90;
            return client.query("ROLLBACK");

          case 90:
            throw _context2.t3.stack;

          case 91:
            _context2.prev = 91;
            client.release();
            return _context2.finish(91);

          case 94:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 86, 91, 94], [9, 49, 52, 55], [16, 38, 41, 44], [58, 75, 78, 81]]);
  }));

  return function changeStatus(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.changeStatus = changeStatus;

var update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
    var id, master, tecnico, detalle, actividad_pendiente, client, results, resultsTecnico, resultsConcepto;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref5.id, master = _ref5.master, tecnico = _ref5.tecnico, detalle = _ref5.detalle, actividad_pendiente = _ref5.actividad_pendiente;
            _context3.next = 3;
            return _db.pool.connect();

          case 3:
            client = _context3.sent;
            _context3.prev = 4;
            _context3.next = 7;
            return client.query("BEGIN");

          case 7:
            _context3.next = 9;
            return client.query((0, _formatter.UPDATE_ACTIVIDAD)(id, master.idcliente, master.idcliente_sucursal, master.idusuario, master.idestadocobro, master.solicitante, master.comentario, master.fecha));

          case 9:
            results = _context3.sent;
            _context3.next = 12;
            return client.query((0, _formatter.DELETE_DET_TECNICO)(id));

          case 12:
            _context3.next = 14;
            return client.query((0, _formatter.DELETE_DET_CONCEPTO)(id));

          case 14:
            _context3.next = 16;
            return client.query((0, _formatter.DELETE_DET_PENDIENTE)(id));

          case 16:
            _context3.next = 18;
            return client.query((0, _formatter.INSERT_DET_TECNICO)(tecnico, id));

          case 18:
            resultsTecnico = _context3.sent;
            _context3.next = 21;
            return client.query((0, _formatter.INSERT_DET_CONCEPTO)(detalle, id));

          case 21:
            resultsConcepto = _context3.sent;

            if (!(actividad_pendiente.length > 0)) {
              _context3.next = 25;
              break;
            }

            _context3.next = 25;
            return client.query((0, _formatter.INSERT_DET_PENDIENTE)(id, actividad_pendiente[0]));

          case 25:
            results.rows[0].tecnico = resultsTecnico.rows;
            results.rows[0].detalle = resultsConcepto.rows;
            _context3.next = 29;
            return client.query("COMMIT");

          case 29:
            return _context3.abrupt("return", results.rows);

          case 32:
            _context3.prev = 32;
            _context3.t0 = _context3["catch"](4);
            _context3.next = 36;
            return client.query("ROLLBACK");

          case 36:
            throw _context3.t0;

          case 37:
            _context3.prev = 37;
            client.release();
            return _context3.finish(37);

          case 40:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 32, 37, 40]]);
  }));

  return function update(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.update = update;

var delet = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var client, pendiente, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _db.pool.connect();

          case 2:
            client = _context4.sent;
            _context4.prev = 3;
            _context4.next = 6;
            return client.query("BEGIN");

          case 6:
            _context4.next = 8;
            return client.query((0, _formatter.DELETE_DET_TECNICO)(id));

          case 8:
            _context4.next = 10;
            return client.query((0, _formatter.DELETE_DET_CONCEPTO)(id));

          case 10:
            _context4.next = 12;
            return client.query((0, _formatter.DELETE_DET_PENDIENTE)(id));

          case 12:
            pendiente = _context4.sent;

            if (!(pendiente.rows.length > 0)) {
              _context4.next = 16;
              break;
            }

            _context4.next = 16;
            return client.query((0, _formatter.UPDATE_PENDIENTE)(pendiente.rows[0].idpendiente, true));

          case 16:
            _context4.next = 18;
            return client.query((0, _formatter.DELETE_ACTIVIDAD)(id));

          case 18:
            results = _context4.sent;
            _context4.next = 21;
            return client.query("COMMIT");

          case 21:
            return _context4.abrupt("return", results.rows);

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](3);
            _context4.next = 28;
            return client.query("ROLLBACK");

          case 28:
            throw _context4.t0;

          case 29:
            _context4.prev = 29;
            client.release();
            return _context4.finish(29);

          case 32:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 24, 29, 32]]);
  }));

  return function delet(_x6) {
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