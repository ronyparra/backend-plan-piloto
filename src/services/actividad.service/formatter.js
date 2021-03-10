export const formatTecnico = (tecnico, id) => {
  return [
    tecnico.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc = acc + `(${id},${curr.idusuario})`);
    }, ""),
  ];
};

export const formatDetalle = (detalle, id) => {
  return [
    detalle.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc =
        acc +
        `(${id},${curr.idconcepto.idconcepto},${curr.precio},${curr.cantidad})`);
    }, ""),
  ];
};

export const formatActividadChangeStatus = (detalle, id) => {
  return detalle.reduce((acc, curr) => {
    return (acc =
      acc +
      `UPDATE actividad SET  idestadocobro= ${id}  WHERE idactividad =  ${curr.idactividad};\n`);
  }, "");
};

export const formatActividadCobro = (detalle, id) => {
  return [
    detalle.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc = acc + `(${id},${curr.idactividad})`);
    }, ""),
  ];
};
