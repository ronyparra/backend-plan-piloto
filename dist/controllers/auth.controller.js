"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.formatPermissions = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../services/user.service"));

var _auth = _interopRequireDefault(require("../services/auth.service"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var AuthController = {
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var user, match, permission, payload, options, secret, token;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _user["default"].getByUsername(req.body);

            case 3:
              user = _context.sent;

              if (!user) {
                _context.next = 20;
                break;
              }

              _context.next = 7;
              return _bcrypt["default"].compare(req.body.password, user.password);

            case 7:
              match = _context.sent;

              if (!match) {
                _context.next = 20;
                break;
              }

              _context.t0 = formatPermissions;
              _context.next = 12;
              return _auth["default"].getPermissionByIdUser(user.idusuario);

            case 12:
              _context.t1 = _context.sent;
              permission = (0, _context.t0)(_context.t1);
              payload = {
                user: user.username,
                id: user.idusuario
              };
              options = {
                expiresIn: "700d"
              };
              secret = process.env.JWT_SECRET;
              token = _jsonwebtoken["default"].sign(payload, secret, options);
              delete user.password;
              return _context.abrupt("return", res.status(200).json({
                status: 200,
                data: {
                  token: token,
                  user: user,
                  permission: permission
                }
              }));

            case 20:
              return _context.abrupt("return", res.status(401).json({
                status: 401,
                message: "Error en la autenticacion"
              }));

            case 23:
              _context.prev = 23;
              _context.t2 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: _context.t2.message
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 23]]);
    }));

    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};

var formatPermissions = function formatPermissions(permissionsRaw) {
  var permissionFormat = [];
  permissionsRaw.map(function (form) {
    var exist = permissionFormat.find(function (x) {
      return form.formulario === x.formulario;
    });

    if (!exist) {
      permissionFormat.push(form);
    } else {
      var index = permissionFormat.indexOf(exist);
      var perm = {};
      Object.entries(permissionFormat[index].permisos).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        perm = _objectSpread(_objectSpread({}, perm), (0, _defineProperty2["default"])({}, key, value));
        Object.entries(form.permisos).map(function (_ref3) {
          var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
              key1 = _ref4[0],
              value1 = _ref4[1];

          if (perm[key1] === undefined) {
            perm = _objectSpread(_objectSpread({}, perm), (0, _defineProperty2["default"])({}, key1, value1));
          } else {
            if (perm[key] === false && form.permisos[key1] === true) {
              perm[key] = form.permisos[key1];
            }
          }
        });
      });
      permissionFormat[index].permisos = JSON.parse(JSON.stringify(perm));
    }
  });
  return permissionFormat;
};

exports.formatPermissions = formatPermissions;
var _default = AuthController;
exports["default"] = _default;