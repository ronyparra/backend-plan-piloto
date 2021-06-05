import { body, validationResult } from "express-validator";

const UserValidator = {
  body: [
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
    body("nombre").not().isEmpty().withMessage("Nombre es obligatorio").bail(),
    body("apellido")
      .not()
      .isEmpty()
      .withMessage("Apellido es obligatorio")
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
  ]
};

export default UserValidator;
