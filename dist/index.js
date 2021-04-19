"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use("/auth", _routes["default"].auth);
app.use("/user", _routes["default"].user);
app.use("/cobro", _routes["default"].cobro);
app.use("/moneda", _routes["default"].moneda);
app.use("/cliente", _routes["default"].cliente);
app.use("/concepto", _routes["default"].concepto);
app.use("/actividad", _routes["default"].actividad);
app.use("/categoria", _routes["default"].categoria);
app.use("/pendiente", _routes["default"].pendiente);
app.use("/analytics", _routes["default"].analytics);
app.use("/usuariorol", _routes["default"].usuario_rol);
app.use("/formulario", _routes["default"].formulario);
app.use("/estadocobro", _routes["default"].estadocobro);
app.use("/tipopendiente", _routes["default"].tipo_pendiente);
app.listen(8001, function () {
  console.log("server started at http://localhost:8001");
});