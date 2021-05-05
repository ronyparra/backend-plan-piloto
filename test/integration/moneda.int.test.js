import app from "../../src/server";
import request from "supertest";
import useradmin from "./user.admin";

var token = null;

beforeAll((done) => {
  request(app)
    .post("/auth")
    .send(useradmin)
    .end((err, res) => {
      expect(res.statusCode).toEqual(200);
      token = res.body.data.token;
      done();
    });
});

afterAll((done) => {
  done();
});

describe("Crud moneda", () => {

  it("Fetch moneda", (done) => {
    request(app)
      .get("/moneda")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

});
