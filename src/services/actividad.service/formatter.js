import { parse_date } from "../../util/date.util";

export const formatMaster = (body) => {
  body.fecha = parse_date(body.fecha);
  return {
    idcliente: body.idcliente.idcliente,
    idcliente_sucursal: body.idcliente_sucursal.idcliente_sucursal,
    idusuario: body.idusuario.idusuario,
    idestadocobro: 1,
    solicitante: body.solicitante,
    comentario: body.comentario,
    fecha: body.fecha,
  };
};

export const calcularTotal = (detalle) =>
  detalle.reduce((acc, curr) => {
    const subtotal = curr.detalle.reduce(
      (acc1, curr1) => (acc1 = acc1 + curr1.cantidad * curr1.precio),
      0
    );
    return (acc = acc + subtotal);
  }, 0);


export const INSERT_ACTIVIDAD = (
  idcliente,
  idcliente_sucursal,
  idusuario,
  idestadocobro,
  solicitante,
  comentario,
  fecha
) =>
  `INSERT INTO actividad( idcliente,idcliente_sucursal, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES (${idcliente}, ${idcliente_sucursal}, ${idusuario}, ${idestadocobro}, '${solicitante}', '${comentario}', '${fecha}') RETURNING *`;

export const INSERT_DET_TECNICO = (detalle, id) => {
  const tecnico = [
    detalle.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc = acc + `(${id},${curr.idusuario})`);
    }, ""),
  ];
  return `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario) VALUES ${tecnico} RETURNING * ;`;
};

export const INSERT_DET_CONCEPTO = (detalle, id) => {
  const conceptos = [
    detalle.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc =
        acc +
        `(${id},${curr.idconcepto.idconcepto},${curr.precio},${curr.cantidad},${curr.idmoneda.idmoneda})`);
    }, ""),
  ];
  return `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad, idmoneda)VALUES ${conceptos} RETURNING * ;`;
};

export const INSERT_DET_PENDIENTE = (idactividad, idpendiente) =>
  `INSERT INTO actividad_pendiente(idactividad, idpendiente)VALUES (${idactividad}, ${idpendiente}) RETURNING *`;

export const INSERT_CLIENTE_COBRO = (
  descripcion,
  idcliente,
  fecha,
  idusuario,
  total,
  idmoneda
) => `INSERT INTO cliente_cobro(
      idestadocobro, descripcion, idcliente, fechainsert, fechacobro, idusuarioinsert, idusuariocobro, comentario, saldocobrado, saldoacobrar, retencion, idmoneda)
    VALUES (2, '${descripcion}', ${idcliente}, '${fecha}', null, ${idusuario}, null, null, 0, ${total}, false, ${idmoneda}) RETURNING *`;
    
export const INSERT_DET_ACT_COBRO = (detalle, id) => {
  const actividad = [
    detalle.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc = acc + `(${id},${curr.idactividad})`);
    }, ""),
  ];
  return `INSERT INTO actividad_cobro(idcliente_cobro, idactividad) VALUES ${actividad} RETURNING *;`;
};

export const DELETE_DET_CONCEPTO = (id) =>
  `DELETE FROM actividad_concepto_detalle WHERE idactividad  = ${id} RETURNING *;`;

export const DELETE_DET_TECNICO = (id) =>
  `DELETE FROM actividad_tecnico_detalle WHERE idactividad  = ${id} RETURNING *;`;

export const DELETE_DET_PENDIENTE = (id) =>
  `DELETE FROM actividad_pendiente WHERE idactividad  = ${id} RETURNING *;`;

export const DELETE_ACTIVIDAD = (id) =>
  `DELETE FROM actividad WHERE idactividad  = ${id} RETURNING *;`;

export const UPDATE_PENDIENTE = (idpendiente, activo) =>
  `UPDATE pendiente SET activo = ${activo} WHERE idpendiente = ${idpendiente} RETURNING *;`;
export const UPDATE_ACTIVIDAD = (
  id,
  idcliente,
  idcliente_sucursal,
  idusuario,
  idestadocobro,
  solicitante,
  comentario,
  fecha
) =>
  `UPDATE actividad SET idcliente=${idcliente}, idcliente_sucursal=${idcliente_sucursal}, idusuario=${idusuario}, idestadocobro=${idestadocobro}, solicitante='${solicitante}', comentario='${comentario}', fecha='${fecha}' WHERE idactividad = ${id} RETURNING *`;

export const CHANGE_ACTIVIDAD_STATUS = (detalle, id) => {
  return detalle.reduce((acc, curr) => {
    return (acc =
      acc +
      `UPDATE actividad SET  idestadocobro= ${id}  WHERE idactividad =  ${curr.idactividad};\n`);
  }, "");
};
