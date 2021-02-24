import db from "../db";

const query = `SELECT idformulario, descripcion, permisos FROM formulario`;

const FormularioService = {
  getAll: async () => {
    try {
      const results = await db.query(query);
      return results.rows;
    } catch (e) {
      throw e;
    }
  },
};

export default FormularioService;
