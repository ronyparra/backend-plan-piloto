export const formatUpdateCobro = (detalle, idestadocobro) =>{
    return detalle.reduce((acc,curr)=>{
      return acc = acc + `UPDATE actividad SET idestadocobro = ${idestadocobro} WHERE idactividad = ${curr.idactividad}; \n`
    },'');
  };