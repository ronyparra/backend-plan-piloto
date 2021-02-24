import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserValidator from "../middlewares/validators/user.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, UserController.get);
router.get("/:id", Auth, UserController.getById);
router.post("/", Auth, UserValidator.body, UserController.create);
router.put("/:id", Auth, UserValidator.update, UserController.update);
router.delete("/:id", Auth, UserController.delete);
export default router;
