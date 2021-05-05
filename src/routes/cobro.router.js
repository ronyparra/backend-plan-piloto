import { Router } from "express";
import CobroController from "../controllers/cobro.controller";
import CobroValidator from "../middlewares/validators/cobro.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, CobroController.get);
router.get("/:id", Auth, CobroController.getById);
router.put("/:id", Auth, CobroValidator.body, CobroController.update);
router.delete("/:id", Auth, CobroController.delete);
export default router;
