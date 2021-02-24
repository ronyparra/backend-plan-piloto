import GrupoUsuarioService from "../services/usuario_rol.service";

const GrupoUsuarioController = {
  get: async (req, res) => {
    try {
      const result = await GrupoUsuarioService.getAll();
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const result = await GrupoUsuarioService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    try {
      const concepto = await GrupoUsuarioService.create(req.body);
      return res.status(200).json({ status: 200, data: concepto });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const result = await GrupoUsuarioService.update({
        ...req.body,
        id: req.params.id,
      });
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await GrupoUsuarioService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default GrupoUsuarioController;
