import CobroService from "../services/cobro.service";

const CobroController = {
  get: async (req, res) => {
    try {
      const response = await CobroService.getAll();
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const response = await CobroService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: response });
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
      const response = await CobroService.create(req.body);
      return res.status(200).json({ status: 200, data: response });
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
      const response = await CobroService.update({
        ...req.body,
        id: req.params.id,
      });
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const response = await CobroService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default CobroController;
