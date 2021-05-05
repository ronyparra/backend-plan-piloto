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

describe("Crud Categoria", () => {
  var id = null;
  const data = {
    idcategoria: null,
    descripcion: "INSERT TESTING",
  };
  it("Fetch categoria", (done) => {
    request(app)
      .get("/categoria")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Create new categoria", (done) => {
    request(app)
      .post("/categoria")
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        id = res.body.data[0].idcategoria;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Get categoria by id", (done) => {
    request(app)
      .get("/categoria/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get categoria by id invalid", (done) => {
    request(app)
      .get("/categoria/" + 'undefined')
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Update categoria", (done) => {
    request(app)
      .put("/categoria/" + id)
      .send({ ...data, descripcion: "UPDATE SUCCESS" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update categoria with intentionally failed", (done) => {
    request(app)
      .put("/categoria/" + 'undefined')
      .send({ ...data, descripcion: "UPATE FAILED" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete categoria", (done) => {
    request(app)
      .delete("/categoria/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Delete categoria with intentionally failed", (done) => {
    request(app)
      .delete("/categoria/" + "undefined")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
