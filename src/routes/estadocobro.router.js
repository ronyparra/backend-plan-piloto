import { Router } from "express";
import EstadoCobroController from "../controllers/estadocobro.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, EstadoCobroController.get);
export default router;
