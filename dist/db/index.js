"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pool = void 0;

var Pool = require('pg')["native"].Pool;

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'integralV3Backup',
  password: 'secreto',
  port: 5432
});
exports.pool = pool;
var _default = {
  query: function query(text, params, callback) {
    return pool.query(text, params, callback);
  }
};
exports["default"] = _default;