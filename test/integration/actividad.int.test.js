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

var pendiente = {
  id: null,
  actividad: {
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
      {
        idconcepto: {
          idconcepto: 2,
        },
        idmoneda: {
          idmoneda: 2,
        },
        precio: 150000,
        cantidad: 1,
      },
    ],
    actividad_pendiente: [44],
  },
  result: null,
};
var oneCurrency = {
  id: null,
  actividad: {
    fecha: "01-01-2000",
    idestadocobro: { idestadocobro: 1 },
    idcliente: { idcliente: 1 },
    idcliente_sucursal: { idcliente_sucursal: 1 },
    idusuario: { idusuario: 1 },
    solicitante: "",
    comentario: "INSERT TESTING WITH ONE DETAIL AND EMPTY ACTIVIDAD_DETALLE",
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
  },
  result: null,
};

var twoCurrency = {
  id: null,
  actividad: {
    fecha: "01-01-2000",
    idestadocobro: { idestadocobro: 1 },
    idcliente: { idcliente: 1 },
    idcliente_sucursal: { idcliente_sucursal: 1 },
    idusuario: { idusuario: 1 },
    solicitante: "",
    comentario: "INSERT TESTING WITH TWO CURRENCY",
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
      {
        idconcepto: {
          idconcepto: 2,
        },
        idmoneda: {
          idmoneda: 2,
        },
        precio: 150000,
        cantidad: 1,
      },
    ],
    actividad_pendiente: [],
  },
  result: null,
};

var invoice = {
  oneCurrency: {
    id: null,
    data: {
      descripcion: "Change Actividad one currency Testing",
      idestadocobro: 2,
      detalle: [],
    },
    result: null,
  },
  twoCurrency: {
    id: null,
    data: {
      descripcion: "Change Actividad two currency Testing",
      idestadocobro: 2,
      detalle: [],
    },
    result: null,
  },
};

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
    {
      idconcepto: {
        idconcepto: 2,
      },
      idmoneda: {
        idmoneda: 2,
      },
      precio: 150000,
      cantidad: 1,
    },
  ],
  actividad_pendiente: [44],
};

var actividadChangeStatus = {
  descripcion: "Change Actividad Testing",
  idestadocobro: 2,
  detalle: [],
};

var cobro = null;

describe("Crud Actividad", () => {
  describe("Intentially failed", () => {
    it("Testing actividad validator", (done) => {
      request(app)
        .post("/actividad")
        .send({ ...oneCurrency.actividad, idcliente: null })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Testing cobro validator", (done) => {
      request(app)
        .put("/cobro/" + 1)
        .send({ ...invoice.oneCurrency.data, idcliente: null })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Create new actividad with failed", (done) => {
      request(app)
        .post("/actividad")
        .send({ ...oneCurrency.actividad, detalle: ["test", "test"] })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Update actividad with intentionally failed", (done) => {
      request(app)
        .put("/actividad/" + "undefined")
        .send({
          ...oneCurrency.actividad,
          comentario: "UPDATE TESTING FAILED",
        })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
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
    it("Create cobro with intentionally failed", (done) => {
      const temp = {
        ...invoice.twoCurrency.data,
        detalle: [
          { ...twoCurrency.actividad, idactividad: 60, tecnico: ["undefined"] },
        ],
      };
      request(app)
        .post("/actividad/status")
        .send(temp)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Update cobro with error", (done) => {
      request(app)
        .put("/cobro/" + "undefined")
        .send({
          ...invoice.oneCurrency.data,
          detalle: ["testing"],
          comentario: "UPDATE FAILED",
        })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Delete generated invoice with error", (done) => {
      request(app)
        .delete("/cobro/" + "undefined")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
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
    it("Fetch actividad by id with error", (done) => {
      request(app)
        .get("/actividad/" + "undefined")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
    it("Fetch Cobro with error", (done) => {
      request(app)
        .get("/cobro")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });

    it("Fetch Cobro by id with error", (done) => {
      request(app)
        .get("/cobro/" + "undefined")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(400);
          done();
        });
    });
  });
  describe("Fetch", () => {
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
  });
  ///////////////////////////////////////////////////////////////
  describe("Crud one currency", () => {
    it("Create new actividad with one currency", (done) => {
      request(app)
        .post("/actividad")
        .send(oneCurrency.actividad)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          oneCurrency.id = res.body.data[0].idactividad;
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch actividad one currency by Id", (done) => {
      request(app)
        .get("/actividad/" + oneCurrency.id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          oneCurrency.result = res.body.data;
          invoice.oneCurrency.data.detalle.push(res.body.data);
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

    describe("Cobro with one currency", () => {
      it("Generate cobro with one currency", (done) => {
        request(app)
          .post("/actividad/status")
          .send(invoice.oneCurrency.data)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            invoice.oneCurrency.id = res.body.data[0].idcliente_cobro;
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
      it("Fetch cobro one currency by Id", (done) => {
        request(app)
          .get("/cobro/" + invoice.oneCurrency.id)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            invoice.oneCurrency.result = res.body.data;
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
      it("Update cobro one currency", (done) => {
        request(app)
          .put("/cobro/" + invoice.oneCurrency.id)
          .send({
            ...invoice.oneCurrency.result,
            comentario: "UPDATE ONE CURRENCY TESTING",
          })
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
      it("Delete cobro one currency", (done) => {
        request(app)
          .delete("/cobro/" + invoice.oneCurrency.id)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
    });
    it("Update actividad with one currency", (done) => {
      request(app)
        .put("/actividad/" + oneCurrency.id)
        .send({
          ...oneCurrency.result,
          comentario: "UPDATE WITH ONE DETAIL TESTING",
        })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });

    it("Delete actividad with one currency", (done) => {
      request(app)
        .delete("/actividad/" + oneCurrency.id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
  });
  ///////////////////////////////////////////////////////////////
  describe("Crud two currency", () => {
    it("Create new actividad with two currency", (done) => {
      request(app)
        .post("/actividad")
        .send(twoCurrency.actividad)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          twoCurrency.id = res.body.data[0].idactividad;
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch actividad two currency by Id", (done) => {
      request(app)
        .get("/actividad/" + twoCurrency.id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          twoCurrency.result = res.body.data;
          invoice.twoCurrency.data.detalle.push(res.body.data);
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    describe("Cobro with two currency", () => {
      it("Generate cobro with two currency", (done) => {
        request(app)
          .post("/actividad/status")
          .send(invoice.twoCurrency.data)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            invoice.twoCurrency.id = res.body.data[0].idcliente_cobro;
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
      it("Fetch cobro two currency by Id", (done) => {
        request(app)
          .get("/cobro/" + invoice.twoCurrency.id)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            invoice.twoCurrency.result = res.body.data;
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
      it("Update cobro two currency", (done) => {
        request(app)
          .put("/cobro/" + invoice.twoCurrency.id)
          .send({
            ...invoice.twoCurrency.result,
            comentario: "UPDATE ONE CURRENCY TESTING",
          })
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
      it("Delete cobro two currency", (done) => {
        request(app)
          .delete("/cobro/" + invoice.twoCurrency.id)
          .set("Authorization", "Bearer " + token)
          .end((err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
          });
      });
    });
    it("Update actividad with two currency", (done) => {
      request(app)
        .put("/actividad/" + twoCurrency.id)
        .send({
          ...twoCurrency.result,
          comentario: "UPDATE WITH TWO DETAIL TESTING",
        })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Delete actividad with two currency", (done) => {
      request(app)
        .delete("/actividad/" + twoCurrency.id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
  });
  ///////////////////////////////////////////////////////////////
  describe("Crud with pendiente", () => {
    it("Create new actividad with pendiente", (done) => {
      request(app)
        .post("/actividad")
        .send(pendiente.actividad)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          pendiente.id = res.body.data[0].idactividad;
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Fetch actividad with pendiente by Id", (done) => {
      request(app)
        .get("/actividad/" + pendiente.id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          pendiente.result = res.body.data;
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Update actividad with pendiente", (done) => {
      request(app)
        .put("/actividad/" + pendiente.id)
        .send({
          ...pendiente.result,
          comentario: "UPDATE WITH PENDIENTE TESTING",
        })
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
    it("Delete actividad with one detail", (done) => {
      request(app)
        .delete("/actividad/" + pendiente.id)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          done();
        });
    });
  });
});
