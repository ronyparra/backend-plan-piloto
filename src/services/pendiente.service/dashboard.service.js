import db from "../../db";
const query = `
SELECT rows FROM (
	SELECT
    json_build_object(
        'tipo', 'Mis Pendientes',
        'color', 'red',
        'icon', 'hail',
        'detalle', (
            SELECT 
                json_agg(
                    json_build_object(
                    'idpendiente', idpendiente,
                    'descripcion', descripcion
                    )
                ) 
            FROM pendiente_tecnico as pend_t
            JOIN pendiente USING (idpendiente)
            WHERE idusuario = $1
            AND pendiente.activo = true
        )
    ) as rows
	UNION ALL
    SELECT
    json_build_object(
        'tipo', tp.descripcion,
        'color', tp.color,
        'icon',tp.icon,
        'detalle', (
            SELECT 
                json_agg(
                    json_build_object(
                    'idpendiente', pt.idpendiente,
                    'descripcion', pt.descripcion
                    )
                ) 
            FROM pendiente as pt 
            WHERE idtipo_pendiente = tp.idtipo_pendiente
            AND  pt.activo = true
        )
    ) as rows
    FROM tipo_pendiente as tp
	
) AS pendientes`;

export const getDashboard = async (idusuario) => {
  const results = await db.query(query, [idusuario]);
  return results.rows.map((x) => x.rows);
};
