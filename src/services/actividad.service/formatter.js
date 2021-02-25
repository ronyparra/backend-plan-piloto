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

