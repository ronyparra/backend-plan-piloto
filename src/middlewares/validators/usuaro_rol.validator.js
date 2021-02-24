import { body, validationResult } from "express-validator";

const GrupoUsuarioValidator = {
  body: [
    body("descripcion")
      .not()
      .isEmpty()
      .withMessage("Descripcion es obligatorio")
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

export default GrupoUsuarioValidator;
