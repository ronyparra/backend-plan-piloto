import db from "../db";
const query = `
SELECT 
	json_build_object(
		'idusuario',usuario.idusuario,
		'username',username,
		'nombre',nombre,
		'apellido', apellido,
		'usuario_rol_detalle', (
			SELECT json_agg(
					rol.idusuario_rol
			)
			FROM usuario_rol_detalle AS userd
			JOIN usuario_rol AS rol USING (idusuario_rol)
			WHERE userd.idusuario = usuario.idusuario
		)
	) AS rows
FROM usuario
`;

const formatRolUsuarioInsert = (usuario_rol_detalle, id) => {
  const detalle = usuario_rol_detalle.reduce((acc, curr) => {
    if (acc !== "") acc = acc + ", \n";
    return (acc = acc + `(${id},${curr})`);
  }, "");
  return `INSERT INTO usuario_rol_detalle(idusuario, idusuario_rol) VALUES \n${detalle};`;
};

const UserService = {
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
      const results = await db.query(query + " WHERE idusuario  = $1", [id]);
      return results.rows[0].rows;
    } catch (e) {
      throw e;
    }
  },
  getByUsername: async ({ username }) => {
    try {
      const results = await db.query(
        "SELECT idusuario, username, password, nombre, apellido, precio FROM usuario WHERE username  LIKE $1",
        [username]
      );
      return results.rows[0];
    } catch (e) {
      throw e;
    }
  },
  create: async ({
    username,
    password,
    nombre,
    apellido,
    usuario_rol_detalle,
  }) => {
    try {
      await db.query("BEGIN");
      const results = await db.query(
        "INSERT INTO usuario (username,password,nombre,apellido) VALUES ($1, $2,$3,$4) RETURNING *",
        [username, password, nombre, apellido]
      );
      const idusuario = results.rows[0].idusuario;
      await db.query(formatRolUsuarioInsert(usuario_rol_detalle, idusuario));
      await db.query("COMMIT");
      return results.rows;
    } catch (e) {
      await db.query("ROLLBACK");
      throw e;
    }
  },
  update: async ({
    username,
    password,
    nombre,
    apellido,
    usuario_rol_detalle,
    id,
  }) => {
    try {
      await db.query("BEGIN");
      const results = await db.query(
        "UPDATE usuario SET username = $1,nombre = $2,apellido = $3 WHERE idusuario = $4 RETURNING *",
        [username, nombre, apellido, id]
      );
      if (password)
        await db.query(
          "UPDATE usuario SET password = $1 WHERE idusuario = $2 RETURNING *",
          [password, id]
        );
      await db.query("DELETE FROM usuario_rol_detalle WHERE idusuario = $1", [
        id,
      ]);
      console.log(formatRolUsuarioInsert(usuario_rol_detalle, id))
      await db.query(formatRolUsuarioInsert(usuario_rol_detalle, id));
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
      await db.query("DELETE FROM usuario_rol_detalle WHERE idusuario = $1", [
        id,
      ]);
      const results = await db.query(
        "DELETE FROM usuario WHERE idusuario  = $1",
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

export default UserService;
