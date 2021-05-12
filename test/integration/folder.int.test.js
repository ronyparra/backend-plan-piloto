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

describe("Crud Folder", () => {
  var id = null;
  const data = {
    descripcion: "INSERT TESTING"
  };
  it("Fetch Folder", (done) => {
    request(app)
      .get("/folder")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Create new Folder", (done) => {
    request(app)
      .post("/folder")
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        id = res.body.data[0].idcarpeta;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Validator descripcion", (done) => {
    request(app)
      .post("/folder")
      .send({...data, descripcion: null})
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Get folder by id", (done) => {
    request(app)
      .get("/folder/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Get folder by id invalid", (done) => {
    request(app)
      .get("/folder/" + 'undefined')
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Update Folder", (done) => {
    request(app)
      .put("/folder/" + id)
      .send({ ...data, descripcion: "UPDATE TEST" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Update folder with intentionally failed", (done) => {
    request(app)
      .put("/folder/" + 'undefined')
      .send(data)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Delete folder", (done) => {
    request(app)
      .delete("/folder/" + id)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Delete folder with intentionally failed", (done) => {
    request(app)
      .delete("/folder/" + "undefined")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
