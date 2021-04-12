import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const AuthController = {
  login: async (req, res) => {
    const formatPermissions = (permissionsRaw) => {
      const permissionFormat = [];
      permissionsRaw.map((form) => {
        const exist = permissionFormat.find(
          (x) => form.formulario === x.formulario
        );
        if (!exist) {
          permissionFormat.push(form);
        } else {
          const index = permissionFormat.indexOf(exist);
          let perm = {};
          Object.entries(permissionFormat[index].permisos).map(
            ([key, value]) => {
              perm = { ...perm, ...{ [key]: value } };
              Object.entries(form.permisos).map(([key1, value1]) => {
                if (perm[key1] === undefined) {
                  perm = { ...perm, ...{ [key1]: value1 } };
                }else{
                  if(perm[key] === false && form.permisos[key1] === true){
                    perm[key] = form.permisos[key1]
                  }
                }
              });
            }
          );
          permissionFormat[index].permisos = JSON.parse(JSON.stringify(perm));
        }
      });
      return permissionFormat;
    };
    try {
      const user = await UserService.getByUsername(req.body);
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const permission =  formatPermissions(await AuthService.getPermissionByIdUser(
            user.idusuario
          ));
          const payload = { user: user.username, id: user.idusuario };
          const options = { expiresIn: "700d" };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options);

          delete user.password;
          return res
            .status(200)
            .json({ status: 200, data: { token, user, permission } });
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
