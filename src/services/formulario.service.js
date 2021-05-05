import db from "../db";

const query = `SELECT idformulario, descripcion, permisos FROM formulario`;

const FormularioService = {
  getAll: async () => {
      const results = await db.query(query);
      return results.rows;
  },
};

export default FormularioService;
