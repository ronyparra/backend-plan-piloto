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

describe("Crud Cliente", () => {
  var idcliente = null;
  var idcliente_suc = null;
  var cliente_inserted = null;
  const cliente = {
    razonsocial: "Cliente de Testing",
    ruc: "n/a",
    sucursal: [{ descripcion: "Central", latitud: null, longitud: null }],
  };
  it("Get all client", (done) => {
    request(app)
      .get("/cliente")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Create new client", (done) => {
    request(app)
      .post("/cliente")
      .send(cliente)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        idcliente = res.body.data[0].idcliente;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Validator descripcion", (done) => {
    request(app)
      .post("/cliente")
      .send({ ...cliente, razonsocial: null })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Create new client with intentionally failed", (done) => {
    request(app)
      .post("/cliente")
      .send({ ...cliente, sucursal: [null] })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Create new client with not sucursal", (done) => {
    request(app)
      .post("/cliente")
      .send({ ...cliente, sucursal: [] })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        idcliente_suc = res.body.data[0].idcliente;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get client by Id", (done) => {
    request(app)
      .get("/cliente/" + idcliente)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        cliente_inserted = res.body.data;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get client by id invalid", (done) => {
    request(app)
      .get("/cliente/" + -32)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Update client with new sucursal", (done) => {
    request(app)
      .put("/cliente/" + idcliente)
      .send({ ...cliente, razonsocial: "Cliente de Testing Update" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update client inserted", (done) => {
    request(app)
      .put("/cliente/" + idcliente)
      .send(cliente_inserted)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update client with not sucursal", (done) => {
    request(app)
      .put("/cliente/" + idcliente)
      .send({
        ...cliente,
        razonsocial: "Cliente de Testing Update sin Sucursal",
        sucursal: [],
      })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update client with intentionally failed", (done) => {
    request(app)
      .put("/cliente/" + idcliente)
      .send({ ...cliente, sucursal: [null] })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete client", (done) => {
    request(app)
      .delete("/cliente/" + idcliente)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Delete client with not sucursal", (done) => {
    request(app)
      .delete("/cliente/" + idcliente_suc)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Delete client with intentionally failed", (done) => {
    request(app)
      .delete("/cliente/" + "no puede ser texto")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
