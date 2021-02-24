"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _usuario_rol = _interopRequireDefault(require("../controllers/usuario_rol.controller"));

var _usuaro_rol = _interopRequireDefault(require("../middlewares/validators/usuaro_rol.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _usuario_rol["default"].get);
router.get("/:id", _auth["default"], _usuario_rol["default"].getById);
router.post("/", _auth["default"], _usuaro_rol["default"].body, _usuario_rol["default"].create);
router.put("/:id", _auth["default"], _usuaro_rol["default"].body, _usuario_rol["default"].update);
router["delete"]("/:id", _auth["default"], _usuario_rol["default"]["delete"]);
var _default = router;
exports["default"] = _default;