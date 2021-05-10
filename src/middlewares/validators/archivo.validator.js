import { body, validationResult } from "express-validator";

const ArchivoValidator = {
  body: [
    body("descripcion")
      .not()
      .isEmpty()
      .withMessage("Descripcion es obligatorio")
      .bail(),
    body("idcliente.idcliente")
      .not()
      .isEmpty()
      .withMessage("Cliente es obligatorio")
      .bail(),
    body("idcarpeta.idcarpeta")
      .not()
      .isEmpty()
      .withMessage("Carpeta es obligatorio")
      .bail(),
    body("archivo_detalle")
      .not()
      .isEmpty()
      .withMessage("Detalle es obligatorio")
      .bail(),

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

export default ArchivoValidator;
