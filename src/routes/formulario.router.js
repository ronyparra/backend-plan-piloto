import { Router } from "express";
import FormularioController from "../controllers/formulario.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, FormularioController.get);
export default router;
