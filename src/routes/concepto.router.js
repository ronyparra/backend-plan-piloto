import { Router } from "express";
import ConceptoController from "../controllers/concepto.controller";
import ConceptoValidator from "../middlewares/validators/concepto.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, ConceptoController.get);
router.get("/:id", Auth, ConceptoController.getById);
router.post("/", Auth, ConceptoValidator.body, ConceptoController.create);
router.put("/:id", Auth, ConceptoValidator.body, ConceptoController.update);
router.delete("/:id", Auth, ConceptoController.delete);
export default router;
