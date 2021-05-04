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

describe("Crud Concepto", () => {
  var idconcepto = null;
  const concepto = {
    descripcion: "Concepto de Testing",
    precio: "40000",
    idmoneda: { idmoneda: 1 },
    idcategoria: { idcategoria: 1 },
  };
  it("Get all conceptos", (done) => {
    request(app)
      .get("/concepto")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Create new concepto", (done) => {
    request(app)
      .post("/concepto")
      .send(concepto)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        idconcepto = res.body.data[0].idconcepto;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Create new concepto with intentionally failed", (done) => {
    request(app)
      .post("/concepto")
      .send({ ...concepto, precio: "esto no debe ser texto" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Get concepto by id", (done) => {
    request(app)
      .get("/concepto/" + idconcepto)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get concepto by id invalid", (done) => {
    request(app)
      .get("/concepto/" + -32)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Update concepto", (done) => {
    request(app)
      .put("/concepto/" + idconcepto)
      .send({ ...concepto, descripcion: "Concepto de Testing Update" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update concepto with intentionally failed", (done) => {
    request(app)
      .put("/concepto/" + idconcepto)
      .send({ ...concepto, precio: "esto no debe ser texto" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete concepto", (done) => {
    request(app)
      .delete("/concepto/" + idconcepto)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Delete concepto with intentionally failed", (done) => {
    request(app)
      .delete("/concepto/" + "no puede ser texto")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
