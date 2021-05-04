import app from "../../src/server";
import request from "supertest";
import user from "./user.admin";

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

    it("Login failed username intentional", (done) => {
      request(app)
        .post("/auth")
        .send({ ...user, username: "esteusuarionoexiste" })
        .end((err, res) => {
          expect(res.statusCode).toEqual(401);
          done();
        });
    });

    it("Login failed password intentional", (done) => {
      request(app)
        .post("/auth")
        .send({ ...user, password: "esteusuarionoexiste" })
        .end((err, res) => {
          expect(res.statusCode).toEqual(401);
          done();
        });
    });

    it("Catch error intentional", (done) => {
      request(app)
        .post("/auth")
        .send({...user, password: -1})
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
});
