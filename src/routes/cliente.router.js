import { Router } from "express";
import ClienteController from "../controllers/cliente.controller";
import ClienteValidator from "../middlewares/validators/cliente.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, ClienteController.get);
router.get("/:id", Auth, ClienteController.getById);
router.post("/", Auth, ClienteValidator.body, ClienteController.create);
router.put("/:id", Auth, ClienteValidator.body, ClienteController.update);
router.delete("/:id", Auth, ClienteController.delete);
export default router;
