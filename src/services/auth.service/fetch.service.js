import db from "../../db";

const query = `
SELECT 
	json_build_object(
		'formulario', formulario.descripcion,
		'permisos', usuario_rol_permiso.permisos
	) as rows
FROM usuario_rol_detalle
JOIN usuario_rol_permiso 	USING (idusuario_rol)
JOIN formulario				USING (idformulario)
JOIN usuario				USING (idusuario)
WHERE idusuario 			=	$1
`;

export const getPermissionByIdUser = async (iduser) => {
  try {
    const results = await db.query(query, [iduser]);
    const permissions = JSON.parse(JSON.stringify(results.rows.map((x) => x.rows)));
    return permissions;
  } catch (e) {
    throw e;
  }
};
export const getPermissionByForm = async (iduser, form) => {
  try {
    const results = await db.query(query + " formulario.descripcion = $2", [ iduser, form ]); 
    return results.rows[0].rows;
  } catch (e) {
    throw e;
  }
};

