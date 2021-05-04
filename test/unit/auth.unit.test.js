import { formatPermissions } from "../../src/controllers/auth.controller";

describe("Authentication", () => {
  it("Create new user", (done) => {
    const formulario = [
      { formulario: "Analytics", permisos: { "Puede listar": true } },
      { formulario: "Analytics", permisos: { "Puede listar": false } },
      { formulario: "Cobro", permisos: { "Puede Registrar": true } },
    ];
    const expected = [
      { formulario: "Analytics", permisos: { "Puede listar": true } },
      { formulario: "Cobro", permisos: { "Puede Registrar": true } },
    ];
    expect(formatPermissions(formulario)).toEqual(expected);
    done();
  });
});
