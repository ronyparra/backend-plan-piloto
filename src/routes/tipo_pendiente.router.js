import { Router } from "express";
import TipoPendienteController from "../controllers/tipo_pendiente.controller";
import TipoPendienteValidator from "../middlewares/validators/tipo_pendiente.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, TipoPendienteController.get);
router.get("/:id", Auth, TipoPendienteController.getById);
router.post("/", Auth, TipoPendienteValidator.body, TipoPendienteController.create);
router.put("/:id", Auth, TipoPendienteValidator.body, TipoPendienteController.update);
router.delete("/:id", Auth, TipoPendienteController.delete);
export default router;
