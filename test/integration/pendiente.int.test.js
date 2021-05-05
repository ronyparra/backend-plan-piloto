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

describe("Crud Pendiente", () => {
  var id = null;
  const data = {
    idtipo_pendiente: {idtipo_pendiente: 1},
    fecha: "01-01-2021",
    descripcion: "INSERT TEST",
    pendiente_tecnico: [{idusuario: 1}]
  };
  it("Fetch Pendiente", (done) => {
    request(app)
      .get("/pendiente")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Fetch Pendiente by Usuario", (done) => {
    request(app)
      .get("/pendiente/dashboard")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Create new Pendiente", (done) => {
    request(app)
      .post("/pendiente")
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        id = res.body.data[0].idpendiente;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Validator descripcion", (done) => {
    request(app)
      .post("/pendiente")
      .send({...data, descripcion: null})
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Create new Pendiente intencionally failed", (done) => {
    request(app)
      .post("/pendiente")
      .send({...data, fecha: 'n-n-n'})
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Change status", (done) => {
    request(app)
      .post("/pendiente/status")
      .send({activo: true, idpendiente: id})
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Change status intencionally failed", (done) => {
    request(app)
      .post("/pendiente/status")
      .send({activo: undefined, idpendiente: id})
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Get pendiente by id", (done) => {
    request(app)
      .get("/pendiente/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get pendiente by id invalid", (done) => {
    request(app)
      .get("/pendiente/" + 'undefined')
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Update pendiente", (done) => {
    request(app)
      .put("/pendiente/" + id)
      .send({ ...data, descripcion: "UPDATE TEST" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update pendiente with intentionally failed", (done) => {
    request(app)
      .put("/pendiente/" + 'undefined')
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete pendiente", (done) => {
    request(app)
      .delete("/pendiente/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Delete pendiente with intentionally failed", (done) => {
    request(app)
      .delete("/pendiente/" + "undefined")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
