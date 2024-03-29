import auth from "./auth.router";
import user from "./user.router";
import userfake from './user.fake.router';
import cliente from "./cliente.router";
import concepto from "./concepto.router";
import categoria from "./categoria.router";
import actividad from "./actividad.router";
import pendiente from "./pendiente.router";
import tipo_pendiente from "./tipo_pendiente.router";
import estadocobro from "./estadocobro.router";
import formulario from "./formulario.router";
import usuario_rol from "./usuario_rol.router";
import cobro from "./cobro.router";
import moneda from "./moneda.router";
import archivo from "./archivo.router";
import folder from "./folder.router";
import analytics from "./analytics.router";

export default {
  auth,
  user,
  cobro,
  archivo,
  folder,
  moneda,
  userfake,
  cliente,
  concepto,
  categoria,
  analytics,
  pendiente,
  actividad,
  formulario,
  estadocobro,
  usuario_rol,
  tipo_pendiente,
};
