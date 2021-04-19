import CategoriaService from "../services/categoria.service";

const CategoriaController = {
  get: async (req, res) => {
    try {
      const result = await CategoriaService.getAll();
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const result = await CategoriaService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const params = {
      descripcion: req.body.descripcion
    }
    try {
      const categoria = await CategoriaService.create(params);
      return res.status(200).json({ status: 200, data: categoria });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    const params = {
      descripcion: req.body.descripcion,
      id: req.params.id
    }
    try {
      const result = await CategoriaService.update(params);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await CategoriaService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default CategoriaController;
