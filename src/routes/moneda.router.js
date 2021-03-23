import { Router } from "express";
import MonedaController from "../controllers/moneda.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, MonedaController.get);
export default router;
