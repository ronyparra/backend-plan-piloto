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

describe("Crud Tipo Pendiente", () => {
  var id = null;
  const data = {
    descripcion: "INSERT TESTING",
    color: "red"
  };
  it("Fetch Tipo Pendiente", (done) => {
    request(app)
      .get("/tipopendiente")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Create new Tipo Pendiente", (done) => {
    request(app)
      .post("/tipopendiente")
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        id = res.body.data[0].idtipo_pendiente;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Get tipo pendiente by id", (done) => {
    request(app)
      .get("/tipopendiente/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get tipo pendiente by id invalid", (done) => {
    request(app)
      .get("/tipopendiente/" + 'undefined')
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Update tipo pendiente", (done) => {
    request(app)
      .put("/tipopendiente/" + id)
      .send({ ...data, descripcion: "UPDATE TEST" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update tipo pendiente with intentionally failed", (done) => {
    request(app)
      .put("/tipopendiente/" + 'undefined')
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete tipo pendiente", (done) => {
    request(app)
      .delete("/tipopendiente/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Delete tipo pendiente with intentionally failed", (done) => {
    request(app)
      .delete("/tipopendiente/" + "undefined")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
