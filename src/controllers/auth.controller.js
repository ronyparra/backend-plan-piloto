import UserService from "../services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const AuthController = {
  login: async (req, res) => {
    try {
      const user = await UserService.getByUsername(req.body);
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const payload = { user: user.username, id: user.idusuario };
          const options = { expiresIn: "700d" };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options);
          delete user.password;
          return res.status(200).json({ status: 200, data: { token , user} });
        }
      }
      return res
        .status(401)
        .json({ status: 401, message: "Error en la autenticacion" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default AuthController;
