"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Pool = require('pg')["native"].Pool;

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'integralTest',
  password: 'secreto',
  port: 5432
});
var _default = {
  query: function query(text, params, callback) {
    return pool.query(text, params, callback);
  }
};
exports["default"] = _default;