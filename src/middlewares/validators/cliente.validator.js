import { body, validationResult } from "express-validator";

const ClienteValidator = {
  body: [
    body("razonsocial")
      .not()
      .isEmpty()
      .withMessage("Razon social es obligatorio")
      .bail(),
    body("ruc").not().isEmpty().withMessage("Ruc es obligatorio").bail(),
    body("sucursal.*.descripcion").not().isEmpty().bail(),

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

export default ClienteValidator;
