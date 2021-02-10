"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse_date = exports.format_date = exports.current_date = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var current_date = function current_date() {
  return format_date(new Date().toISOString().substr(0, 10));
};

exports.current_date = current_date;

var format_date = function format_date(date) {
  if (!date) return null;

  var _date$split = date.split("-"),
      _date$split2 = (0, _slicedToArray2["default"])(_date$split, 3),
      year = _date$split2[0],
      month = _date$split2[1],
      day = _date$split2[2];

  return "".concat(day, "-").concat(month, "-").concat(year);
};

exports.format_date = format_date;

var parse_date = function parse_date(date) {
  if (!date) return null;

  var _date$split3 = date.split("-"),
      _date$split4 = (0, _slicedToArray2["default"])(_date$split3, 3),
      day = _date$split4[0],
      month = _date$split4[1],
      year = _date$split4[2];

  return "".concat(year, "-").concat(month.padStart(2, "0"), "-").concat(day.padStart(2, "0"));
};

exports.parse_date = parse_date;