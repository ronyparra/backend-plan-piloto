import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", routes.auth);
app.use("/user", routes.user);
app.use("/userfake", routes.userfake);
app.use("/cobro", routes.cobro);
app.use("/moneda", routes.moneda);
app.use("/cliente", routes.cliente);
app.use("/concepto", routes.concepto);
app.use("/actividad", routes.actividad);
app.use("/categoria", routes.categoria);
app.use("/pendiente", routes.pendiente);
app.use("/analytics", routes.analytics);
app.use("/usuariorol", routes.usuario_rol);
app.use("/formulario", routes.formulario);
app.use("/estadocobro", routes.estadocobro);
app.use("/folder", routes.folder);
app.use("/archivo", routes.archivo);
app.use("/tipopendiente", routes.tipo_pendiente);


module.exports = app