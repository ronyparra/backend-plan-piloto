import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller";
import CategoriaValidator from "../middlewares/validators/categoria.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, CategoriaController.get);
router.get("/:id", Auth, CategoriaController.getById);
router.post("/", Auth, CategoriaValidator.body, CategoriaController.create);
router.put("/:id", Auth, CategoriaValidator.body, CategoriaController.update);
router.delete("/:id", Auth, CategoriaController.delete);
export default router;
