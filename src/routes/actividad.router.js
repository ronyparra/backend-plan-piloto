import { Router } from "express";
import ActividadController from "../controllers/actividad.controller";
import ActividadValidator from "../middlewares/validators/actividad.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, ActividadController.get);
router.get("/:id", Auth, ActividadController.getById);
router.post("/status", Auth, ActividadController.changeStatus);
router.post("/", Auth, ActividadValidator.body, ActividadController.create);
router.put("/:id", Auth, ActividadValidator.body, ActividadController.update);
router.delete("/:id", Auth, ActividadController.delete);
export default router;
