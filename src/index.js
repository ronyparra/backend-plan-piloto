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
app.use("/cliente", routes.cliente);
app.use("/concepto", routes.concepto);

app.listen(8001, () => {
  console.log("server started at http://localhost:8001");
});
