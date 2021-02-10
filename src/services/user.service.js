import db from "../db";

const UserService = {
  getAll: async () => {
    try {
      const results = await db.query("SELECT idusuario, username, nombre, apellido, precio FROM usuario");
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getById: async (id) => {
    try {
      const results = await db.query(
        "SELECT idusuario, username, nombre, apellido, precio FROM usuario WHERE idusuario  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  getByUsername: async ({ username }) => {
    try {
      const results = await db.query(
        "SELECT idusuario, username, nombre, apellido, precio FROM usuario WHERE username  LIKE $1",
        [username]
      );
      return results.rows[0];
    } catch (e) {
      throw e;
    }
  },
  create: async ({ username, password, nombre, apellido }) => {
    try {
      const results = await db.query(
        "INSERT INTO usuario (username,password,nombre,apellido) VALUES ($1, $2,$3,$4) RETURNING *",
        [username, password, nombre, apellido]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  update: async ({ username, password, nombre, apellido, id }) => {
    try {
      const results = await db.query(
        "UPDATE usuario SET username = $1, password = $2,nombre = $3,apellido = $4 WHERE idusuario = $5 RETURNING *",
        [username, password, nombre, apellido, id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
  delete: async (id) => {
    try {
      const results = await db.query(
        "DELETE FROM usuario WHERE idusuario  = $1",
        [id]
      );
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default UserService;
