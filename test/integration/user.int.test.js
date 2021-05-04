import app from "../../src/server";
import request from "supertest";
import useradmin from "./user.int.testing";

var token = null;
var idusuario = null;
const username = "userNameInsert";
const usernameUpdate = "userNameUpdate";
const user = {
  username: username,
  password: "passwordTest",
  nombre: "Unit",
  apellido: "Testing",
  precio: 80000,
  usuario_rol_detalle: [1],
};

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

afterAll(done => {
  done()
})

describe("User", () => {
  describe("Crud and Authentication", () => {
    it("Create new user",  (done) => {
      request(app)
        .post("/user")
        .send(user)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          idusuario = res.body.data[0].idusuario;
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Update user", (done) => {
      request(app)
        .put("/user/" + idusuario)
        .send({ ...user, username: usernameUpdate })
        .set("Authorization", "Bearer " + token)
        .end( (err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Delete User", (done) => {
      request(app)
        .delete("/user/" + idusuario)
        .set("Authorization", "Bearer " + token)
        .end( (err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

  });
});
