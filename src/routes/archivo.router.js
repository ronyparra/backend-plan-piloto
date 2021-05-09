import { Router } from "express";
import ArchivoController from "../controllers/archivo.controller";
import ArchivoValidator from "../middlewares/validators/archivo.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, ArchivoController.get);
router.get("/cliente/:id", Auth, ArchivoController.getByIdCliente);
router.get("/:id", Auth, ArchivoController.getById);
router.post("/", Auth, ArchivoValidator.body, ArchivoController.create);
router.put("/:id", Auth, ArchivoValidator.body, ArchivoController.update);
router.delete("/:id", Auth, ArchivoController.delete);
export default router;
