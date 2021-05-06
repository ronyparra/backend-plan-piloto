import {
  INSERT_DET_PENDIENTE,
  UPDATE_PENDIENTE,
  INSERT_DET_TECNICO,
  INSERT_DET_ACT_COBRO,
  INSERT_DET_PENDIENTE_TECNICO
} from "../../src/services/actividad.service/formatter";

describe("Actividad Service", () => {
  const tecnico = {
    unico: [{ idusuario: 1 }],
    doble: [{ idusuario: 1 }, { idusuario: 2 }],
  };

  const actividad = {
    unico: [{ idactividad: 1 }],
    doble: [{ idactividad: 1 }, { idactividad: 2 }],
  };

  const expected = `INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES (1, 1) RETURNING *`;
  it("Get det_pendiente query for insert", (done) => {
    expect(INSERT_DET_PENDIENTE(1, 1)).toEqual(expected);
    done();
  });

  it("Get pendiente query for update", (done) => {
    expect(UPDATE_PENDIENTE(1, true)).toEqual(
      `UPDATE pendiente SET activo = true WHERE idpendiente = 1 RETURNING *;`
    );
    done();
  });

  it("Get det tecnico with a detail to insert", (done) => {
    expect(INSERT_DET_TECNICO(tecnico.unico, 1)).toEqual(
      `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES (1,1) RETURNING * ;`
    );
    done();
  });

  it("Get det tecnico with two details to insert", (done) => {
    expect(INSERT_DET_TECNICO(tecnico.doble, 1)).toEqual(
      `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES (1,1),(1,2) RETURNING * ;`
    );
    done();
  });


  it("Get det actividad cobro with a detail to insert", (done) => {
    expect(INSERT_DET_ACT_COBRO(actividad.unico, 1)).toEqual(
      `INSERT INTO actividad_cobro(idcliente_cobro, idactividad) VALUES (1,1) RETURNING *;`
    );
    done();
  });

  it("Get det actividad cobro with two details to insert", (done) => {
    expect(INSERT_DET_ACT_COBRO(actividad.doble, 1)).toEqual(
      `INSERT INTO actividad_cobro(idcliente_cobro, idactividad) VALUES (1,1),(1,2) RETURNING *;`
    );
    done();
  });

  it("Get det pendiente tecnico with a detail to insert", (done) => {
    expect(INSERT_DET_PENDIENTE_TECNICO(tecnico.unico, 1)).toEqual(
      `INSERT INTO pendiente_tecnico(idpendiente, idusuario) VALUES (1,1) RETURNING * ;`
    );
    done();
  });

  it("Get det pendiente tecnico cobro with two details to insert", (done) => {
    expect(INSERT_DET_PENDIENTE_TECNICO(tecnico.doble, 1)).toEqual(
      `INSERT INTO pendiente_tecnico(idpendiente, idusuario) VALUES (1,1),(1,2) RETURNING * ;`
    );
    done();
  });
});
