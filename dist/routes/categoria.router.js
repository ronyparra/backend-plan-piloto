"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _categoria = _interopRequireDefault(require("../controllers/categoria.controller"));

var _categoria2 = _interopRequireDefault(require("../middlewares/validators/categoria.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _categoria["default"].get);
router.get("/:id", _auth["default"], _categoria["default"].getById);
router.post("/", _auth["default"], _categoria2["default"].body, _categoria["default"].create);
router.put("/:id", _auth["default"], _categoria2["default"].body, _categoria["default"].update);
router["delete"]("/:id", _auth["default"], _categoria["default"]["delete"]);
var _default = router;
exports["default"] = _default;