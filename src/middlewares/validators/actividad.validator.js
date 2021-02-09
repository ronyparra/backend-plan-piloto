import { body, validationResult } from "express-validator";

const ActividadValidator = {
  body: [
    body("idcliente.idcliente")
      .not()
      .isEmpty()
      .withMessage("Cliente es obligatorio")
      .bail(),
    body("idusuario.idusuario")
      .not()
      .isEmpty()
      .withMessage("Usuario es obligatorio")
      .bail(),
    body("fecha").not().isEmpty().withMessage("Fecha es obligatorio").bail(),
    body("tecnico.*.idusuario").not().isEmpty().bail(),
    body("detalle.*.idconcepto").not().isEmpty().bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => {
          return { param: error.param, msg: error.msg };
        });
        return res.status(400).json({
          errors: errorMessages,
        });
      }
      next();
    },
  ],
};

export default ActividadValidator;
