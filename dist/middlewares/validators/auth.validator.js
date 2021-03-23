"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var AuthValidator = {
  login: [(0, _expressValidator.body)("username").not().isEmpty().withMessage("Nombre de usuario es obligatorio").bail(), (0, _expressValidator.body)("password").not().isEmpty().withMessage("Contraseña es obligatorio").bail(), function (req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
      var errorMessages = errors.array().map(function (error) {
        return {
          param: error.param,
          msg: error.msg
        };
      });
      return res.status(400).json({
        errors: errorMessages
      });
    }

    next();
  }]
};
var _default = AuthValidator;
exports["default"] = _default;