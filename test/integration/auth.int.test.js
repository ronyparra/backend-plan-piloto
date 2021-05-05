import app from "../../src/server";
import request from "supertest";
import user from "./user.admin";

describe("Authentication", () => {
  var token = null;
  it("Login Success", (done) => {
    request(app)
      .post("/auth")
      .send(user)
      .end((err, res) => {
        token = res.body.data.token;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Auth middleware with token", (done) => {
    request(app)
      .get("/user")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });


  it("Auth middleware not  token property", (done) => {
    request(app)
      .get("/user")
      .end((err, res) => {
        expect(res.statusCode).toEqual(401);
        done();
      });
  });


  it("Auth middleware not token value", (done) => {
    request(app)
      .get("/user")
      .set("Authorization",false)
      .end((err, res) => {
        expect(res.statusCode).toEqual(401);
        done();
      });
  });

  it("Auth middleware with token invalid", (done) => {
    request(app)
      .get("/user")
      .set("Authorization",'Bearer nottoken')
      .end((err, res) => {
        expect(res.statusCode).toEqual(401);
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
      .send({ ...user, password: -1 })
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
