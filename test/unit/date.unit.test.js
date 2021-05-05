import {
  current_date,
  format_date,
  parse_date,
  substract_days,
  calc_diff_days,
} from "../../src/util/date.util";

describe("Authentication", () => {
  it("Get current date", (done) => {
    expect(current_date()).toEqual(new Date().toISOString().substr(0, 10));
    done();
  });
  it("Format date day/month/year", (done) => {
    expect(format_date("2000-01-01")).toEqual("01-01-2000");
    done();
  });
  it("Format date empty", (done) => {
    expect(format_date()).toEqual(null);
    done();
  });
  it("Parse date year/month/day", (done) => {
    expect(parse_date("01-01-2000")).toEqual("2000-01-01");
    done();
  });
  it("Parse date empty", (done) => {
    expect(parse_date()).toEqual(null);
    done();
  });
  it("Subtract days of date ", (done) => {
    expect(substract_days("2000-01-06", 5)).toEqual("2000-01-01");
    done();
  });
  it("Get difference days", (done) => {
    expect(calc_diff_days("2000-01-06", "2000-01-01")).toEqual(5);
    done();
  });
});
