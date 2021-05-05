import { formatRolUsuarioInsert } from "../../src/services/user.service";

describe("User Service", () => {

  const query = {
    insert: `INSERT INTO usuario_rol_detalle(idusuario, idusuario_rol) VALUES \n(1,1);`,
    insertMultiple: `INSERT INTO usuario_rol_detalle(idusuario, idusuario_rol) VALUES \n(1,1), \n(1,2);`
  }



  it("Get rol usuario query for insert", (done) => {
    expect(formatRolUsuarioInsert([1], 1)).toEqual(query.insert);
    done();
  });

  it("Get rol usuario query for insert if more one detail", (done) => {
    expect(formatRolUsuarioInsert([1,2], 1)).toEqual(query.insertMultiple);
    done();
  });

});
