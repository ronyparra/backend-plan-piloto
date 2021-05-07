import UserService from "../services/user.service";
import bcrypt from "bcrypt";

const UserController = {
  get: async (req, res) => {
    try {
      const users = await UserService.getAll();
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      /* istanbul ignore next */ 
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const users = await UserService.getById(req.params.id);
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(
        req.body.password,
        10
      );
      const users = await UserService.create(req.body);
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    try {
      if(req.body.password)
      req.body.password = await bcrypt.hash(
        req.body.password,
        10
      );
      const users = await UserService.update({
        ...req.body,
        id: req.params.id,
      });
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const users = await UserService.delete(req.params.id);
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default UserController;
