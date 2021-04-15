"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _analytics = _interopRequireDefault(require("../controllers/analytics.controller"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/actividad", _auth["default"], _analytics["default"].getActividad);
router.get("/pendiente", _auth["default"], _analytics["default"].getPendientes);
router.get("/cliente", _auth["default"], _analytics["default"].getCliente);
router.get("/concepto", _auth["default"], _analytics["default"].getConcepto);
var _default = router;
exports["default"] = _default;