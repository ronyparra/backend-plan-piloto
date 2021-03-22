"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var CobroValidator = {
  body: [(0, _expressValidator.body)("idcliente").not().isEmpty().withMessage("Cliente es obligatorio").bail(), (0, _expressValidator.body)("idestadocobro").not().isEmpty().withMessage("Estado es obligatorio").bail(), (0, _expressValidator.body)("saldoacobrar").not().isEmpty().withMessage("Saldo es obligatorio").bail(), function (req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);

    if (!errors.isEmpty()) {
      var errorMessages = errors.array().map(function (error) {
        return error.msg;
      });
      return res.status(400).json({
        errors: errorMessages
      });
    }

    next();
  }]
};
var _default = CobroValidator;
exports["default"] = _default;