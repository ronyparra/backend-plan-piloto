import TipoPendienteService from "../services/tipo_pendiente.service";

const TipoPendienteController = {
  get: async (req, res) => {
    try {
      const tipo_pendiente = await TipoPendienteService.getAll();
      return res.status(200).json({ status: 200, data: tipo_pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const tipo_pendiente = await TipoPendienteService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: tipo_pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const insert = {
      descripcion: req.body.descripcion,
      color: req.body.color
    }
    try {
      const tipo_pendiente = await TipoPendienteService.create(insert);
      return res.status(200).json({ status: 200, data: tipo_pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    const update = {
      descripcion: req.body.descripcion,
      color: req.body.color,
    }
    try {
      const tipo_pendiente = await TipoPendienteService.update({
        ...update,
        id: req.params.id,
      });
      return res.status(200).json({ status: 200, data: tipo_pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const tipo_pendiente = await TipoPendienteService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: tipo_pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default TipoPendienteController;
