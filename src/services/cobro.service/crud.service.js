import { pool } from "../../db";
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
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const results = await client.query(
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
    await client.query(formatUpdateCobro(actividad_cobro, idestadocobro));
    await client.query("COMMIT");
    return results.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};
export const delet = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const actividad_cobro = await client.query(
      "SELECT idcliente_cobro, idactividad FROM actividad_cobro WHERE idcliente_cobro = $1",
      [id]
    );
    await client.query(formatUpdateCobro(actividad_cobro.rows, 1));
    await client.query("DELETE FROM actividad_cobro WHERE idcliente_cobro = $1", [
      id,
    ]);
    const results = await client.query(
      "DELETE FROM cliente_cobro WHERE idcliente_cobro  = $1",
      [id]
    );
    await client.query("COMMIT");
    return results.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }finally {
    client.release();
  }
};
