import db from "../db";

const ActividadService = {
  getAll: async () => {
    try {
      const results = await db.query("SELECT * FROM actividad");
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(
        "SELECT * FROM actividad WHERE idactividad  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  create: async ({ master, detailTecnico, detailConcepto }) => {
    try {
      const results = await db.query(
        "INSERT INTO actividad( idcliente, idusuario, idestadocobro, solicitante, comentario, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          master.idcliente,
          master.idusuario,
          master.idestadocobro,
          master.solicitante,
          master.comentario,
          master.fecha,
        ]
      );
      const idactividad = results.rows[0].idactividad;
      detailTecnico.map((d) => {
        d.idactividad = idactividad;
      });
      detailConcepto.map((c) => {
        c.idactividad - idactividad;
      });
      const resultsTecnico = await db.query(
        `INSERT INTO actividad_tecnico_detalle(idactividad, idusuario, precio) VALUES ${detailTecnico} RETURNING *`
      );
      const resultsConcepto = await db.query(
        `INSERT INTO actividad_concepto_detalle(idactividad, idconcepto, precio, cantidad)VALUES ${detailConcepto} RETURNING *`
      );
      results.rows[0].tecnico = resultsTecnico.rows;
      results.rows[0].detalle = resultsConcepto.rows;
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ razonsocial, ruc }) => {
    try {
      const results = await db.query(
        "UPDATE actividad SET razonsocial = $1, ruc = $2 RETURNING *",
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
        "DELETE FROM actividad WHERE idactividad  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default ActividadService;
