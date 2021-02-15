import ClienteService from "../services/cliente.service";

const ClienteController = {
  get: async (req, res) => {
    try {
      const cliente = await ClienteService.getAll();
      return res.status(200).json({ status: 200, data: cliente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const cliente = await ClienteService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: cliente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    try {
      if (req.body.sucursal.length === 0) {
        req.body.sucursal = [
          {
            descripcion: "N/A",
          },
        ];
      }
      const cliente = await ClienteService.create(req.body);
      return res.status(200).json({ status: 200, data: cliente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    try {
      if (req.body.sucursal.length === 0) {
        req.body.sucursal = [
          {
            descripcion: "N/A",
          },
        ];
      }
      const cliente = await ClienteService.update({
        ...req.body,
        id: req.params.id,
      });
      return res.status(200).json({ status: 200, data: cliente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const cliente = await ClienteService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: cliente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default ClienteController;
