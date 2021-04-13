import { Router } from "express";
import AnalyticsController from "../controllers/analytics.controller";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/actividad", Auth, AnalyticsController.getActividad);
export default router;
