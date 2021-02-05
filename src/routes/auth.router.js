import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import AuthValidator from "../middlewares/validators/auth.validator";

const router = Router();

router.post("/",AuthValidator.login, AuthController.login);

export default router;
