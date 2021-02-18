import db from "../../db";
const query = `
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
            FROM pendiente as pt WHERE idtipo_pendiente = tp.idtipo_pendiente
        )
    ) as rows
    FROM tipo_pendiente as tp`;

export const getDashboard = async () => {
  try {
    const results = await db.query(query);
    return results.rows.map((x) => x.rows);
  } catch (e) {
    throw e;
  }
};
