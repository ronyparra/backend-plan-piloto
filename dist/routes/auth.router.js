"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _auth2 = _interopRequireDefault(require("../middlewares/validators/auth.validator"));

var router = (0, _express.Router)();
router.post("/", _auth2["default"].login, _auth["default"].login);
var _default = router;
exports["default"] = _default;