"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _actividad = _interopRequireDefault(require("../controllers/actividad.controller"));

var _actividad2 = _interopRequireDefault(require("../middlewares/validators/actividad.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _actividad["default"].get);
router.get("/:id", _auth["default"], _actividad["default"].getById);
router.post("/", _auth["default"], _actividad2["default"].body, _actividad["default"].create);
router.put("/:id", _auth["default"], _actividad2["default"].body, _actividad["default"].update);
router["delete"]("/:id", _auth["default"], _actividad["default"]["delete"]);
var _default = router;
exports["default"] = _default;