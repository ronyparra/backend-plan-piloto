import db, { pool } from "../db";
const query = `
SELECT 
	json_build_object(
		'idusuario',usuario.idusuario,
		'username',username,
		'nombre',nombre,
		'apellido', apellido
	) AS rows
FROM usuario
`;

const UserService = {
  getAll: async () => {
    const results = await db.query(query);
    return results.rows.map((x) => x.rows);
  },
  getById: async (id) => {
    const results = await db.query(query + " WHERE idusuario  = $1", [id]);
    return results.rows[0].rows;
  },
  getByUsername: async ({ username }) => {
    const results = await db.query(
      "SELECT idusuario, username, password, nombre, apellido, precio FROM usuario WHERE username  LIKE $1",
      [username]
    );
    return results.rows[0];
  },

  create: async ({ username, password, nombre, apellido }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const results = await client.query(
        "INSERT INTO usuario (username,password,nombre,apellido) VALUES ($1, $2,$3,$4) RETURNING *",
        [username, password, nombre, apellido]
      );
      await client.query("COMMIT");
      return results.rows;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  },
  update: async ({ username, password }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const verificar = await client.query(
        "SELECT * FROM usuario WHERE username = $1",
        [username]
      );
      if(verificar.rows.length === 0) throw 'No existe este usuario'
      const results = await client.query(
        "UPDATE usuario SET username = $1, password = $2 WHERE username = $1 RETURNING *",
        [username, password]
      );
      await client.query("COMMIT");
      return results.rows;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  },
  delete: async (id) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "DELETE FROM usuario_rol_detalle WHERE idusuario = $1",
        [id]
      );
      const results = await client.query(
        "DELETE FROM usuario WHERE idusuario  = $1",
        [id]
      );
      await client.query("COMMIT");
      return results.rows;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  },
};

export default UserService;
