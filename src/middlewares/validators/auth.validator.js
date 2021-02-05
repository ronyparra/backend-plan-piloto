import { body, validationResult } from "express-validator";

const AuthValidator = {
  login: [
    body("username")
      .not()
      .isEmpty()
      .withMessage("Nombre de usuario es obligatorio")
      .bail(),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Contraseña es obligatorio")
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

export default AuthValidator;
