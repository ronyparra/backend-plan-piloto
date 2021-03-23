"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var ClienteValidator = {
  body: [(0, _expressValidator.body)("razonsocial").not().isEmpty().withMessage("Razon social es obligatorio").bail(), (0, _expressValidator.body)("ruc").not().isEmpty().withMessage("Ruc es obligatorio").bail(), function (req, res, next) {
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
var _default = ClienteValidator;
exports["default"] = _default;