import { Router } from "express";
import UserController from "../controllers/user.fake.controller";
import UserValidator from "../middlewares/validators/user.fake.validator";

const router = Router();

router.get("/", UserController.get);
router.get("/:id",  UserController.getById);
router.post("/", UserValidator.body, UserController.create);
router.put("/:id", UserValidator.body, UserController.update);
router.delete("/:id", UserController.delete);
export default router;
