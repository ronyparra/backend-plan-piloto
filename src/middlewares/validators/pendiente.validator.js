import { body, validationResult } from "express-validator";

const PendienteValidator = {
  body: [
    body("descripcion")
      .not()
      .isEmpty()
      .withMessage("Descripcion es obligatorio")
      .bail(),
    body("fecha").not().isEmpty().withMessage("Fecha es obligatorio").bail(),
    body("idtipo_pendiente.idtipo_pendiente").not().isEmpty().withMessage("Tipo es obligatorio").bail(),

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

export default PendienteValidator;
