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

describe("Fetch analytics", () => {
  describe("Actividad", () => {
    it("Fetch actividad analytics", (done) => {
      request(app)
        .get("/analytics/actividad/?desde=01-04-2021&hasta=30-04-2021")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch actividad analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/actividad/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });
  describe("Pendiente", () => {
    it("Fetch pendiente analytics", (done) => {
      request(app)
        .get("/analytics/pendiente/?desde=01-04-2021&hasta=30-04-2021")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch pendiente analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/pendiente/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  describe("Cliente", () => {
    it("Fetch cliente analytics", (done) => {
      request(app)
        .get("/analytics/cliente/?desde=01-04-2021&hasta=30-04-2021")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch cliente analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/cliente/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  describe("Concepto", () => {
    it("Fetch concepto analytics", (done) => {
      request(app)
        .get("/analytics/concepto/?desde=01-04-2021&hasta=30-04-2021")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch concepto analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/concepto/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  describe("Tecnico", () => {
    it("Fetch tecnico analytics", (done) => {
      request(app)
        .get("/analytics/tecnico/?desde=01-04-2021&hasta=30-04-2021")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch tecnico analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/tecnico/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  describe("Tecnico", () => {
    it("Fetch categoria analytics", (done) => {
      request(app)
        .get("/analytics/categoria/?desde=01-04-2021&hasta=30-04-2021")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch categoria analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/categoria/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  describe("Tecnico", () => {
    it("Fetch estado analytics with old data true", (done) => {
      request(app)
        .get("/analytics/estado/?desde=01-04-2021&hasta=30-04-2021&old=true")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch estado analytics with old data false", (done) => {
      request(app)
        .get("/analytics/estado/?desde=01-04-2021&hasta=30-04-2021&old=false")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch estado analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/estado/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  describe("Tecnico", () => {
    it("Fetch cobro analytics", (done) => {
      request(app)
        .get("/analytics/cobrotecnico/?desde=01-04-2021&hasta=30-04-2021")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch cobro analytics with intentionally failed", (done) => {
      request(app)
        .get("/analytics/cobrotecnico/?desde=2021-15-15&hasta=2021-15-15")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });
});
