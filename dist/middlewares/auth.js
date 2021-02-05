"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var validateToken = function validateToken(req, res, next) {
  var result;
  var token = req.headers.authorization.split("Bearer ")[1];

  if (token) {
    var options = {
      expiresIn: "2d"
    };

    try {
      result = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, options);
      req.decoded = result;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

var _default = validateToken;
exports["default"] = _default;