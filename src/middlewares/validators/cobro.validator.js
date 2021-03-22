import { body, validationResult } from "express-validator";

const CobroValidator = {
  body: [
    body("idcliente")
      .not()
      .isEmpty()
      .withMessage("Cliente es obligatorio")
      .bail(),
    body("idestadocobro")
      .not()
      .isEmpty()
      .withMessage("Estado es obligatorio")
      .bail(),
    body("saldoacobrar")
      .not()
      .isEmpty()
      .withMessage("Saldo es obligatorio")
      .bail(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => {
          return error.msg;
        });
        return res.status(400).json({
          errors: errorMessages,
        });
      }
      next();
    },
  ],
};

export default CobroValidator;
