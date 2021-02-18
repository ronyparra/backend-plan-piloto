"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _pendiente = _interopRequireDefault(require("../controllers/pendiente.controller"));

var _pendiente2 = _interopRequireDefault(require("../middlewares/validators/pendiente.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _pendiente["default"].get);
router.get("/dashboard", _auth["default"], _pendiente["default"].getDashboard);
router.get("/:id", _auth["default"], _pendiente["default"].getById);
router.post("/", _auth["default"], _pendiente2["default"].body, _pendiente["default"].create);
router.put("/:id", _auth["default"], _pendiente2["default"].body, _pendiente["default"].update);
router["delete"]("/:id", _auth["default"], _pendiente["default"]["delete"]);
var _default = router;
exports["default"] = _default;