import ConceptoService from "../services/concepto.service";

const ConceptoController = {
  get: async (req, res) => {
    try {
      const users = await ConceptoService.getAll();
      return res.status(200).json({ status: 200, data: users });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const users = await ConceptoService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: users });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    try {
      const concepto = await ConceptoService.create(req.body);
      return res.status(200).json({ status: 200, data: concepto });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const users = await ConceptoService.update({
        ...req.body,
        id: req.params.id,
      });
      return res.status(200).json({ status: 200, data: users });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const users = await ConceptoService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: users });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default ConceptoController;
