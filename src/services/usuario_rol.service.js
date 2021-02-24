import db from "../db";

const GrupoUsuarioService = {
  getAll: async () => {
    try {
      const results = await db.query("SELECT idusuario_rol, descripcion FROM usuario_rol");
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(
        "SELECT idusuario_rol, descripcion FROM usuario_rol WHERE idusuario_rol  = $1",
        [id]
      );
      return results.rows[0];
    } catch (e) {
      throw e;
    }
  },
  create: async ({ descripcion }) => {
    try {
      await db.query("BEGIN");
      const results = await db.query(
        "INSERT INTO usuario_rol(descripcion) VALUES ($1) RETURNING *",
        [descripcion]
      );
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
  update: async ({ descripcion, id}) => {
    try {
      const results = await db.query(
        "UPDATE usuario_rol SET descripcion = $1 WHERE idusuario_rol = $2 RETURNING *",
        [descripcion, id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      const results = await db.query(
        "DELETE FROM usuario_rol WHERE idusuario_rol  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default GrupoUsuarioService;
