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
    body("tecnico").not().isEmpty().withMessage("Tecnico es obligatorio").bail(),
    body("detalle").not().isEmpty().withMessage("Detalle es obligatorio").bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => {
          return  error.msg ;
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
