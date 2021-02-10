import ActividadService from "../services/actividad.service";

const ActividadController = {
  get: async (req, res) => {
    try {
      const users = await ActividadService.getAll();
      return res.status(200).json({ status: 200, data: users });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const users = await ActividadService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: users });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const master = {
      idcliente: req.body.idcliente.idcliente,
      idusuario: req.body.idusuario.idusuario,
      idestadocobro: 1,
      solicitante: req.body.solicitante,
      comentario: req.body.comentario,
      fecha: req.body.fecha,
    };
    const tecnico = req.body.tecnico;
    const detalle = req.body.detalle;
    try {
      const actividad = await ActividadService.create({
        master,
        tecnico,
        detalle,
      });
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    try {
      const users = await ActividadService.update({
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
      const users = await ActividadService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: users });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default ActividadController;
