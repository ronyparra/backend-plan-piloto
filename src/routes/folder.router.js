import { Router } from "express";
import FolderController from "../controllers/folder.controller";
import FolderValidator from "../middlewares/validators/folder.validator";
import Auth from "../middlewares/auth";

const router = Router();

router.get("/", Auth, FolderController.get);
router.get("/:id", Auth, FolderController.getById);
router.post("/", Auth, FolderValidator.body, FolderController.create);
router.put("/:id", Auth, FolderValidator.body, FolderController.update);
router.delete("/:id", Auth, FolderController.delete);
export default router;
