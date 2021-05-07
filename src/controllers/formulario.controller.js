import FormularioService from "../services/formulario.service";

const FormularioController = {
  get: async (req, res) => {
    try {
      const response = await FormularioService.getAll();
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      /* istanbul ignore next */ 
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default FormularioController;
