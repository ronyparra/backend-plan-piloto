import db from "../db";

const GrupoUsuarioService = {
  getAll: async () => {
    const results = await db.query(
      "SELECT idusuario_rol, descripcion FROM usuario_rol"
    );
    return results.rows;
  },
  getById: async (id) => {
    const results = await db.query(
      "SELECT idusuario_rol, descripcion FROM usuario_rol WHERE idusuario_rol  = $1",
      [id]
    );
    return results.rows[0];
  },
  create: async ({ descripcion }) => {
    const results = await db.query(
      "INSERT INTO usuario_rol(descripcion) VALUES ($1) RETURNING *",
      [descripcion]
    );
    return results.rows;
  },
  update: async ({ descripcion, id }) => {
    const results = await db.query(
      "UPDATE usuario_rol SET descripcion = $1 WHERE idusuario_rol = $2 RETURNING *",
      [descripcion, id]
    );
    return results.rows;
  },
  delete: async (id) => {
    const results = await db.query(
      "DELETE FROM usuario_rol WHERE idusuario_rol  = $1",
      [id]
    );
    return results.rows;
  },
};

export default GrupoUsuarioService;
