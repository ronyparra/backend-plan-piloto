import { formatSucursalUpdate, formatSucursalInsert } from "../../src/services/cliente.service";

describe("Cliente Service", () => {
  const sucursal = [
    {
      latitud: null,
      longitud: null,
      idcliente_sucursal: 1,
      descripcion: "test",
    },
  ];
  const sucursallatlog = [
    {
      latitud: 1,
      longitud: 1,
      idcliente_sucursal: 1,
      descripcion: "test",
    },
  ];

  const query = {
    update: `UPDATE cliente_sucursal SET descripcion = 'test', latitud = null, longitud = null WHERE idcliente = 1 AND idcliente_sucursal = 1; \n`,
    updateLatLon: `UPDATE cliente_sucursal SET descripcion = 'test', latitud = '1', longitud = '1' WHERE idcliente = 1 AND idcliente_sucursal = 1; \n`,
    insert: `INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES \n(1,'test',null,null);`,
    insertMultiple: `INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES \n(1,'test',null,null), \n(1,'test',null,null);`,
    insertLatLon: `INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES \n(1,'test','1','1');`
  }


  it("Get sucursal query for update", (done) => {
    expect(formatSucursalUpdate(sucursal, 1)).toEqual(query.update);
    done();
  });
  
  it("Get sucursal query with lat/log for update", (done) => {
    expect(formatSucursalUpdate(sucursallatlog, 1)).toEqual(query.updateLatLon);
    done();
  });

  it("Get sucursal query for insert", (done) => {
    expect(formatSucursalInsert(sucursal, 1)).toEqual(query.insert);
    done();
  });

  it("Get sucursal query for insert if more one detail", (done) => {
    expect(formatSucursalInsert([sucursal[0],sucursal[0]], 1)).toEqual(query.insertMultiple);
    done();
  });

  it("Get sucursal query with lat/log for insert", (done) => {
    expect(formatSucursalInsert(sucursallatlog, 1)).toEqual(query.insertLatLon);
    done();
  });

});
