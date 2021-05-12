import { formatDet } from "../../src/services/archivo.service";

describe("Actividad Service", () => {
  const detalle = {
    unico: [
      {
        descripcion: "test",
        titulo: "test",
      },
    ],
    doble: [
      {
        descripcion: "test",
        titulo: "test",
      },
      {
        descripcion: "test",
        titulo: "test",
      },
    ],
  };

  it("Format archivo_detalle simple", (done) => {
    expect(formatDet(detalle.unico, 1, 1)).toEqual(`(1,1,'test','test')`);
    done();
  });
  it("Format archivo_detalle doble", (done) => {
    expect(formatDet(detalle.doble, 1, 1)).toEqual(`(1,1,'test','test'),\n(1,1,'test','test')`);
    done();
  });
});
