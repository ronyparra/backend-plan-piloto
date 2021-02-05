"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _user2 = _interopRequireDefault(require("../middlewares/validators/user.validator"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var router = (0, _express.Router)();
router.get("/", _auth["default"], _user["default"].get);
router.get("/:id", _auth["default"], _user["default"].getById);
router.post("/", _auth["default"], _user2["default"].body, _user["default"].create);
router.put("/:id", _auth["default"], _user2["default"].body, _user["default"].update);
router["delete"]("/:id", _auth["default"], _user["default"]["delete"]);
var _default = router;
exports["default"] = _default;