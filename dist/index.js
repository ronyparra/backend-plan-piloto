"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _server = _interopRequireDefault(require("./server"));

var port = 8001;

_server["default"].listen(port, function () {
  console.log("server started at http://localhost:8001");
});