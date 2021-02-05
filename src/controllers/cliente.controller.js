import ClienteService from "../services/cliente.service";

const ClienteController = {
  get: async (req, res) => {
    try {
      const users = await ClienteService.getAll();
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const users = await ClienteService.getById(req.params.id);
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    try {
      const cliente = await ClienteService.create(req.body);
      return res
        .status(200)
        .json({ status: 200, data: cliente});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const users = await ClienteService.update({
        ...req.body,
        id: req.params.id,
      });
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const users = await ClienteService.delete(req.params.id);
      return res
        .status(200)
        .json({ status: 200, data: users});
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default ClienteController;
