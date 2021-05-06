import { formatPermissions } from "../../src/controllers/auth.controller";

describe("Authentication", () => {
  it("Format permission per user if form is repeating", (done) => {
    const formulario = [
      { formulario: "Analytics", permisos: { "Puede listar": false } },
      {
        formulario: "Analytics",
        permisos: { "Puede listar": true, "Puede eliminar": false },
      },
      { formulario: "Cobro", permisos: { "Puede Registrar": true } },
      { formulario: "Cobro", permisos: { "Puede Registrar": true } },
    ];
    const expected = [
      {
        formulario: "Analytics",
        permisos: { "Puede listar": true, "Puede eliminar": false },
      },
      { formulario: "Cobro", permisos: { "Puede Registrar": true } },
    ];
    expect(formatPermissions(formulario)).toEqual(expected);
    done();
  });

  it("Format permission per user if form is not repeating", (done) => {
    const formulario = [
      { formulario: "Analytics", permisos: { "Puede listar": false } },
      { formulario: "Cobro", permisos: { "Puede Registrar": true } },
    ];
    expect(formatPermissions(formulario)).toEqual(formulario);
    done();
  });
  it("Permission is empty", (done) => {
    expect(formatPermissions([])).toEqual([]);
    done();
  });
});
