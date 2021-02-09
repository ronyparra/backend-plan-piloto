"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var ActividadValidator = {
  body: [(0, _expressValidator.body)("idcliente.idcliente").not().isEmpty().withMessage("Cliente es obligatorio").bail(), (0, _expressValidator.body)("idusuario.idusuario").not().isEmpty().withMessage("Usuario es obligatorio").bail(), (0, _expressValidator.body)("fecha").not().isEmpty().withMessage("Fecha es obligatorio").bail(), (0, _expressValidator.body)("tecnico.*.idusuario").not().isEmpty().bail(), (0, _expressValidator.body)("detalle.*.idconcepto").not().isEmpty().bail(), function (req, res, next) {
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
var _default = ActividadValidator;
exports["default"] = _default;