import db from "../db";
const query = `
SELECT 
	json_build_object(
		'idusuario',usuario.idusuario,
		'username',username,
		'nombre',nombre,
		'apellido', apellido,
		'grupo_usuario', (
			SELECT json_agg(
				json_build_object(
					'idusuario_rol', json_build_object(
						'idusuario_rol', rol.idusuario_rol,
						'descripcion',rol.descripcion
					),
					'idusuario', usuario.idusuario
					
				)
			)
			FROM usuario_rol_detalle AS userd
			JOIN usuario_rol AS rol USING (idusuario_rol)
			WHERE userd.idusuario = usuario.idusuario
		)
	) AS rows
FROM usuario
`;
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
        "UPDATE usuario SET username = $1,nombre = $2,apellido = $3 WHERE idusuario = $4 RETURNING *",
        [username, nombre, apellido, id]
      );
      if (password)
        await db.query(
          "UPDATE usuario SET password = $1 idusuario = $2 RETURNING *",
          [password, id]
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
