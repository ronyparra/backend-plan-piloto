"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _tipo_pendiente = _interopRequireDefault(require("../controllers/tipo_pendiente.controller"));

var _tipo_pendiente2 = _interopRequireDefault(require("../middlewares/validators/tipo_pendiente.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _tipo_pendiente["default"].get);
router.get("/:id", _auth["default"], _tipo_pendiente["default"].getById);
router.post("/", _auth["default"], _tipo_pendiente2["default"].body, _tipo_pendiente["default"].create);
router.put("/:id", _auth["default"], _tipo_pendiente2["default"].body, _tipo_pendiente["default"].update);
router["delete"]("/:id", _auth["default"], _tipo_pendiente["default"]["delete"]);
var _default = router;
exports["default"] = _default;