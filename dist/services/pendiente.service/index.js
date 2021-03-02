"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dashboard = require("./dashboard.service");

var _crud = require("./crud.service");

var _default = {
  getDashboard: _dashboard.getDashboard,
  getAll: _crud.getAll,
  getById: _crud.getById,
  create: _crud.create,
  changeStatus: _crud.changeStatus,
  update: _crud.update,
  delet: _crud.delet
};
exports["default"] = _default;