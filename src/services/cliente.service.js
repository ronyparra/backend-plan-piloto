import db from "../db";

const ClienteService = {
  getAll: async () => {
    try {
      const results = await db.query("SELECT * FROM cliente");
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(
        "SELECT * FROM cliente WHERE idcliente  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ razonsocial, ruc, sucursal }) => {
    try {
      const results = await db.query(
        "INSERT INTO cliente(razonsocial, ruc) VALUES ($1, $2) RETURNING *",
        [razonsocial, ruc]
      );
      const idcliente = results.rows[0].idcliente;
      const detail = sucursal.reduce((acc, curr) => {
        if (acc !== "") acc = acc + ",";
        return (acc =
          acc +
          `(${idcliente},'${curr.descripcion}','${curr.latitud}','${curr.longitud}')`);
      }, "");
      const resultsDetail = await db.query(
        `INSERT INTO cliente_sucursal( idcliente, descripcion, latitud, longitud) VALUES ${detail} RETURNING *`
      );
      results.rows[0].sucursal = resultsDetail.rows;
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ razonsocial, ruc }) => {
    try {
      const results = await db.query(
        "UPDATE cliente SET razonsocial = $1, ruc = $2 RETURNING *",
        [razonsocial, ruc]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      const results = await db.query(
        "DELETE FROM cliente WHERE idcliente  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default ClienteService;
