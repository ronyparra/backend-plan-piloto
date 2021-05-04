import app from "../../src/server";
import request from "supertest";
import user from "./user.int.testing";

describe("Authentication", () => {
    it("Login Success", (done) => {
      request(app)
        .post("/auth")
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

    it("Login failed intentional", (done) => {
      request(app)
        .post("/auth")
        .send({ ...user, username: "esteusuarionoexiste" })
        .end((err, res) => {
          expect(res.statusCode).toEqual(401);
          done();
        });
    });
});
