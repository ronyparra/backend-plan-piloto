import db from "../../db";
import { formatUpdateCobro } from "./formatter";

export const update = async ({
  fechacobro,
  idusuariocobro,
  comentario,
  saldocobrado,
  retencion,
  idestadocobro,
  actividad_cobro,
  id,
}) => {
  try {
    await db.query("BEGIN");
    const results = await db.query(
      `UPDATE cliente_cobro
        SET 
          fechacobro		  =$1, 
          idusuariocobro	=$2, 
          comentario		  =$3, 
          saldocobrado	  =$4, 
          retencion		    =$5, 
          idestadocobro	  =$6
        WHERE idcliente_cobro = $7 RETURNING *`,
      [
        fechacobro,
        idusuariocobro,
        comentario,
        saldocobrado,
        retencion,
        idestadocobro,
        id,
      ]
    );
    await db.query(formatUpdateCobro(actividad_cobro, idestadocobro));
    await db.query("COMMIT");
    return results.rows;
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  }
};
export const delet = async (id) => {
  try {
    const actividad_cobro = await db.query(
      "SELECT idcliente_cobro, idactividad FROM actividad_cobro WHERE idcliente_cobro = $1",
      [id]
    );
    await db.query(formatUpdateCobro(actividad_cobro.rows, 1));
    await db.query("DELETE FROM actividad_cobro WHERE idcliente_cobro = $1", [
      id,
    ]);
    const results = await db.query(
      "DELETE FROM cliente_cobro WHERE idcliente_cobro  = $1",
      [id]
    );
    return results.rows;
  } catch (e) {
    throw e;
  }
};
