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

describe("Crud Usuario Rol", () => {
  var id = null;
  const data = {
    descripcion: "INSERT TEST",
  };
  it("Fetch Usuario Rol", (done) => {
    request(app)
      .get("/usuariorol")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Create new usuario rol", (done) => {
    request(app)
      .post("/usuariorol")
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        id = res.body.data[0].idusuario_rol;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Get usuario rol by id", (done) => {
    request(app)
      .get("/usuariorol/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Get usuario rol by id invalid", (done) => {
    request(app)
      .get("/usuariorol/" + "undefined")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Update usuario rol", (done) => {
    request(app)
      .put("/usuariorol/" + id)
      .send({ descripcion: "UPDATE TEST" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Update usuario rol with intentionally failed", (done) => {
    request(app)
      .put("/usuariorol/" + "undefined")
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete usuario rol", (done) => {
    request(app)
      .delete("/usuariorol/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Delete usuario rol with intentionally failed", (done) => {
    request(app)
      .delete("/usuariorol/" + "undefined")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
