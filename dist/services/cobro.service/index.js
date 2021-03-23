"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crud = require("./crud.service");

var _fetch = require("./fetch.service");

var _default = {
  getAll: _fetch.getAll,
  getById: _fetch.getById,
  update: _crud.update,
  delet: _crud.delet
};
exports["default"] = _default;