import { Router } from "express";
import PendienteController from "../controllers/pendiente.controller";
import PendienteValidator from "../middlewares/validators/pendiente.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, PendienteController.get);
router.get("/dashboard", Auth, PendienteController.getDashboard);
router.get("/:id", Auth, PendienteController.getById);
router.post("/", Auth, PendienteValidator.body, PendienteController.create);
router.put("/:id", Auth, PendienteValidator.body, PendienteController.update);
router.delete("/:id", Auth, PendienteController.delete);
export default router;
