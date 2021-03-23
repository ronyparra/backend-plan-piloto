"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _cliente = _interopRequireDefault(require("../controllers/cliente.controller"));

var _cliente2 = _interopRequireDefault(require("../middlewares/validators/cliente.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _cliente["default"].get);
router.get("/:id", _auth["default"], _cliente["default"].getById);
router.post("/", _auth["default"], _cliente2["default"].body, _cliente["default"].create);
router.put("/:id", _auth["default"], _cliente2["default"].body, _cliente["default"].update);
router["delete"]("/:id", _auth["default"], _cliente["default"]["delete"]);
var _default = router;
exports["default"] = _default;