"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var ConceptoValidator = {
  body: [(0, _expressValidator.body)("descripcion").not().isEmpty().withMessage("Descripcion es obligatorio").bail(), (0, _expressValidator.body)("idmoneda.idmoneda").not().isEmpty().withMessage("Moneda es obligatorio").bail(), (0, _expressValidator.body)("idcategoria.idcategoria").not().isEmpty().withMessage("Categoria es obligatorio").bail(), (0, _expressValidator.body)("precio").not().isEmpty().withMessage("Precio es obligatorio").bail(), function (req, res, next) {
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
var _default = ConceptoValidator;
exports["default"] = _default;