"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _formulario = _interopRequireDefault(require("../controllers/formulario.controller"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _formulario["default"].get);
var _default = router;
exports["default"] = _default;