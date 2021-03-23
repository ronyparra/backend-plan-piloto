"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _concepto = _interopRequireDefault(require("../controllers/concepto.controller"));

var _concepto2 = _interopRequireDefault(require("../middlewares/validators/concepto.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _concepto["default"].get);
router.get("/:id", _auth["default"], _concepto["default"].getById);
router.post("/", _auth["default"], _concepto2["default"].body, _concepto["default"].create);
router.put("/:id", _auth["default"], _concepto2["default"].body, _concepto["default"].update);
router["delete"]("/:id", _auth["default"], _concepto["default"]["delete"]);
var _default = router;
exports["default"] = _default;