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

describe("Crud Archivo", () => {
  var idarchivo = null;
  var archivo_inserted = null;
  const archivo = {
    idcliente: {
      idcliente: 3
    },
    idcarpeta: {
      idcarpeta: 1
    },
    descripcion: "INSERT TESTING",
    comentario: "TESTING",
    archivo_detalle: [
      {
        descripcion: "TESTING",
        titulo: "INSERT TESTING",
      },
    ],
  };
  it("Get all client", (done) => {
    request(app)
      .get("/archivo")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Create new archivo", (done) => {
    request(app)
      .post("/archivo")
      .send(archivo)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        idarchivo = res.body.data[0].idarchivo;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Validator descripcion", (done) => {
    request(app)
      .post("/archivo")
      .send({ ...archivo, descripcion: null })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Create new archivo with intentionally failed", (done) => {
    request(app)
      .post("/archivo")
      .send({ ...archivo, idcarpeta: {idcarpeta: "invalid"}})
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Get archivo by Id", (done) => {
    request(app)
      .get("/archivo/" + idarchivo)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        archivo_inserted = res.body.data;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get archivo by id invalid", (done) => {
    request(app)
      .get("/archivo/" + -32)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Get archivo by idcliente and idcarpeta", (done) => {
    request(app)
      .get("/archivo/cliente/"+3+"/?idcarpeta="+1)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        archivo_inserted = res.body.data;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Get archivo by idcliente and idcarpeta failed", (done) => {
    request(app)
      .get("/archivo/cliente/indefined/?idcarpeta="+1)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        archivo_inserted = res.body.data;
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Update archivo inserted ", (done) => {
    request(app)
      .put("/archivo/" + idarchivo)
      .send({ ...archivo, descripcion: "UPDATE TESTING" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Update archivo with intentionally failed", (done) => {
    request(app)
      .put("/archivo/" + idarchivo)
      .send({ ...archivo,  idcarpeta: {idcarpeta: "invalid"} })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete archivo", (done) => {
    request(app)
      .delete("/archivo/" + idarchivo)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Delete archivo with intentionally failed", (done) => {
    request(app)
      .delete("/archivo/" + "no puede ser texto")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
