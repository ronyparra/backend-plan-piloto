"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _cobro = _interopRequireDefault(require("../controllers/cobro.controller"));

var _cobro2 = _interopRequireDefault(require("../middlewares/validators/cobro.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _cobro["default"].get);
router.get("/:id", _auth["default"], _cobro["default"].getById);
router.put("/:id", _auth["default"], _cobro2["default"].body, _cobro["default"].update);
router["delete"]("/:id", _auth["default"], _cobro["default"]["delete"]);
var _default = router;
exports["default"] = _default;