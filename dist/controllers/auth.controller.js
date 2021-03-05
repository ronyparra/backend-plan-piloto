"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../services/user.service"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var AuthController = {
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var user, match, payload, options, secret, token;
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
                _context.next = 15;
                break;
              }

              _context.next = 7;
              return _bcrypt["default"].compare(req.body.password, user.password);

            case 7:
              match = _context.sent;

              if (!match) {
                _context.next = 15;
                break;
              }

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
                  user: user
                }
              }));

            case 15:
              return _context.abrupt("return", res.status(401).json({
                status: 401,
                message: "Error en la autenticacion"
              }));

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(400).json({
                status: 400,
                message: _context.t0.message
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 18]]);
    }));

    function login(_x, _x2) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
var _default = AuthController;
exports["default"] = _default;