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

var idactividad = null;
var idcobro_cliente = null;
const actividad = {
  fecha: "01-01-2000",
  idestadocobro: { idestadocobro: 1 },
  idcliente: { idcliente: 1 },
  idcliente_sucursal: { idcliente_sucursal: 1 },
  idusuario: { idusuario: 1 },
  solicitante: "",
  comentario: "INSERT TESTING",
  tecnico: [{ idusuario: 1 }],
  detalle: [
    {
      idconcepto: {
        idconcepto: 1,
      },
      idmoneda: {
        idmoneda: 1,
      },
      precio: 150000,
      cantidad: 1,
    },
  ],
  actividad_pendiente: [],
};

var actividadChangeStatus = {
  descripcion: "Change Actividad Testing",
  idestadocobro: 2,
  detalle: [],
};

var cobro = null;

describe("Crud Actividad", () => {
  it("Fetch actividad", (done) => {
    request(app)
      .get(
        "/actividad/?desde=01-04-2021&hasta=30-04-2021&cliente=undefined&sucursal=undefined&estado=undefined"
      )
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Fetch actividad with client, sucursal and estado", (done) => {
    request(app)
      .get(
        "/actividad/?desde=01-04-2021&hasta=30-04-2021&cliente=1&sucursal=1&estado=1"
      )
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Fetch actividad with error", (done) => {
    request(app)
      .get("/actividad")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
  it("Create new actividad", (done) => {
    request(app)
      .post("/actividad")
      .send(actividad)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        idactividad = res.body.data[0].idactividad;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });
  it("Fetch actividad by Id", (done) => {
    request(app)
      .get("/actividad/" + idactividad)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        actividadChangeStatus.detalle.push(res.body.data);
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Generate invoice of actividad", (done) => {
    request(app)
      .post("/actividad/status")
      .send(actividadChangeStatus)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        idcobro_cliente = res.body.data[0].idcliente_cobro;
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Generate invoice with intentionally failed", (done) => {
    request(app)
      .post("/actividad/status")
      .send({})
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  describe("Crud Cobro", () => {
    it("Fetch Cobro", (done) => {
      request(app)
        .get(
          "/cobro/?desde=01-04-2021&hasta=30-04-2021&cliente=undefined&idusuario=undefined&estado=undefined"
        )
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch Cobro with error", (done) => {
      request(app).get("/cobro")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Fetch Cobro by Id", (done) => {
      request(app)
        .get("/cobro/" + idcobro_cliente)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          cobro = res.body.data;
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch Cobro by id with error", (done) => {
      request(app)
        .get("/cobro/" + 'undefined')
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Update cobro", (done) => {
      request(app)
        .put("/cobro/" + idcobro_cliente)
        .send({
          ...cobro,
          comentario: "UPDATE TESTING",
        })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

    it("Update cobro with error", (done) => {
      request(app)
        .put("/cobro/" + 'undefined')
        .send({
          ...cobro,
          comentario: "UPDATE FAILED",
        })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  
    it("Delete generated invoice", (done) => {
      request(app)
        .delete("/cobro/" + idcobro_cliente)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Delete generated invoice with error", (done) => {
      request(app)
        .delete("/cobro/" + 'undefined')
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });

  it("Update actividad", (done) => {
    request(app)
      .put("/actividad/" + idactividad)
      .send({
        ...actividadChangeStatus.detalle[0],
        comentario: "UPDATE TESTING",
      })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Update actividad with intentionally failed", (done) => {
    request(app)
      .put("/actividad/" + "undefined")
      .send({
        ...actividadChangeStatus.detalle[0],
        comentario: "UPDATE TESTING FAILED",
      })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Delete actividad", (done) => {
    request(app)
      .delete("/actividad/" + idactividad)
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
  });

  it("Delete actividad with intentionally failed", (done) => {
    request(app)
      .delete("/actividad/" + "undefined")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Create new actividad with intentionally failed", (done) => {
    request(app)
      .post("/actividad")
      .send({ ...actividad, fecha: "no es una fecha" })
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });

  it("Get actividad by id invalid", (done) => {
    request(app)
      .get("/actividad/" + "no es un id")
      .set("Authorization", "Bearer " + token)
      .end((err, res) => {
        expect(res.statusCode).toEqual(400);
        done();
      });
  });
});
