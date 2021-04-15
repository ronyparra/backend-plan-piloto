import { Router } from "express";
import AnalyticsController from "../controllers/analytics.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/actividad", Auth, AnalyticsController.getActividad);
router.get("/pendiente", Auth, AnalyticsController.getPendientes);
router.get("/cliente", Auth, AnalyticsController.getCliente);
router.get("/concepto", Auth, AnalyticsController.getConcepto);
export default router;
