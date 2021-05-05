import app from "../../src/server";
import request from "supertest";
import useradmin from "./user.admin";

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
  describe("Crud ", () => {
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
    it("Create new user with failed intentionally",  (done) => {
      request(app)
        .post("/user")
        .send({...user, usuario_rol_detalle: ['undefined']})
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });

    it("Fetch user",  (done) => {
      request(app)
        .get("/user")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

    it("Fetch user by id",  (done) => {
      request(app)
        .get("/user/"+idusuario)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

    it("Fetch user by id  with failed intentionally",  (done) => {
      request(app)
        .get("/user/"+ 'undefined')
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
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

    it("Update user with failed intentionally", (done) => {
      request(app)
        .put("/user/" + idusuario)
        .send({ ...user, username: 'UPDATE FAILED', usuario_rol_detalle: ['undefined'] })
        .set("Authorization", "Bearer " + token)
        .end( (err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });

    it("Delete User ", (done) => {
      request(app)
        .delete("/user/" + idusuario)
        .set("Authorization", "Bearer " + token)
        .end( (err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

    it("Delete User with failed intentionally", (done) => {
      request(app)
        .delete("/user/" + 'undefined')
        .set("Authorization", "Bearer " + token)
        .end( (err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });

  });
});
