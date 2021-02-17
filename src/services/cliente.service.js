import db from "../db";
const query = `SELECT 
	    json_build_object(
		  'idcliente', idcliente,
		  'razonsocial', razonsocial,
		  'ruc',  ruc,
		  'sucursal',(
			  SELECT json_agg(
				  json_build_object(
				  'idcliente',cli_suc.idcliente,
				  'idcliente_sucursal', cli_suc.idcliente_sucursal,
				  'descripcion', cli_suc.descripcion,
				  'latitud', cli_suc.latitud,
				  'longitud', cli_suc.longitud
				  )
			  )
			  FROM cliente_sucursal as cli_suc
		  	WHERE cli_suc.idcliente = cliente.idcliente
		  )
	  ) as rows
    FROM cliente`;

const formatSucursalDelete = (sucursal, id) => {
  return sucursal.reduce((acc, curr) => {
    return (acc =
      acc +
      `DELETE FROM cliente_sucursal WHERE idcliente  = ${id} AND idcliente_sucursal = ${curr.idcliente_sucursal}; \n`);
  }, "");
};

const formatSucursalUpdate = (sucursal, id) => {
  return sucursal.reduce((acc, curr) => {
    const latitud = curr.latitud ? `'${curr.latitud}'` : null;
    const longitud = curr.longitud ? `'${curr.longitud}'` : null;
    return (acc =
      acc +
      `UPDATE cliente_sucursal SET descripcion = '${curr.descripcion}', latitud = ${latitud}, longitud = ${longitud} WHERE idcliente = ${id} AND idcliente_sucursal = ${curr.idcliente_sucursal}; \n`);
  }, "");
};

const formatSucursalInsert = (sucursal, id) => {
  const detalle = sucursal.reduce((acc, curr) => {
    if (acc !== "") acc = acc + ", \n";
    const latitud = curr.latitud ? `'${curr.latitud}'` : null;
    const longitud = curr.longitud ? `'${curr.longitud}'` : null;
    return (acc = acc + `(${id},'${curr.descripcion}',${latitud},${longitud})`);
  }, "");
  return `INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES \n${detalle};`;
};

const ClienteService = {
  getSucursalByCliente: async (idcliente) => {
    try {
      const results = await db.query(
        `SELECT idcliente, idcliente_sucursal, descripcion, latitud, longitud
        FROM cliente_sucursal WHERE idcliente = $1`,
        [idcliente]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getAll: async () => {
    try {
      const results = await db.query(query);
      return results.rows.map((x) => x.rows);
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(query + " WHERE idcliente  = $1", [id]);
      return results.rows[0].rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ razonsocial, ruc, sucursal }) => {
    try {
      await db.query("BEGIN");
      const results = await db.query(
        "INSERT INTO cliente(razonsocial, ruc) VALUES ($1, $2) RETURNING *",
        [razonsocial, ruc]
      );
      const idcliente = results.rows[0].idcliente;
      const resultsDetail = await db.query(formatSucursalInsert(sucursal, idcliente));
      results.rows[0].sucursal = resultsDetail.rows;
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
  update: async ({ razonsocial, ruc, sucursal, id }) => {

    try {
      await db.query("BEGIN");
      const oldSucursal = await ClienteService.getSucursalByCliente(id);
      const inserts = sucursal.filter((suc_new) => !suc_new.idcliente_sucursal);
      const updates = sucursal.filter((suc_new) => suc_new.idcliente_sucursal);
      const deletes = oldSucursal.filter(
        (suc_old) =>
          !updates.find(
            ({ idcliente_sucursal }) =>
              suc_old.idcliente_sucursal === idcliente_sucursal
          )
      );
      const results = await db.query(
        "UPDATE cliente SET razonsocial = $1, ruc = $2 WHERE idcliente = $3 RETURNING *",
        [razonsocial, ruc, id]
      );
      
      if (inserts.length > 0) await db.query(formatSucursalInsert(inserts, id));
      if (updates.length > 0) await db.query(formatSucursalUpdate(updates, id));
      if (deletes.length > 0) await db.query(formatSucursalDelete(deletes, id));
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
  delete: async (id) => {
    try {
      await db.query("BEGIN");
      await db.query("DELETE FROM cliente_sucursal WHERE idcliente  = $1", [
        id,
      ]);
      const results = await db.query(
        "DELETE FROM cliente WHERE idcliente  = $1",
        [id]
      );
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
};

export default ClienteService;
