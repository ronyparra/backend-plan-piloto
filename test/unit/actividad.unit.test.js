import { INSERT_DET_PENDIENTE, UPDATE_PENDIENTE } from "../../src/services/actividad.service/formatter";

describe("Actividad Service", () => {
  const expected = `INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES (1, 1) RETURNING *`
  it("Get det_pendiente query for insert", (done) => {
    expect(INSERT_DET_PENDIENTE(1, 1)).toEqual(expected);
    done();
  });

  it("Get pendiente query for update", (done) => {
    expect(UPDATE_PENDIENTE(1, true)).toEqual(`UPDATE pendiente SET activo = true WHERE idpendiente = 1 RETURNING *;`);
    done();
  });

});
