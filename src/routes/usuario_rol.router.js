import { Router } from "express";
import GrupoUsuarioController from "../controllers/usuario_rol.controller";
import GrupoUsuarioValidator from "../middlewares/validators/usuaro_rol.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, GrupoUsuarioController.get);
router.get("/:id", Auth, GrupoUsuarioController.getById);
router.post("/", Auth, GrupoUsuarioValidator.body, GrupoUsuarioController.create);
router.put("/:id", Auth, GrupoUsuarioValidator.body, GrupoUsuarioController.update);
router.delete("/:id", Auth, GrupoUsuarioController.delete);
export default router;
