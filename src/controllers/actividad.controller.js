import ActividadService from "../services/actividad.service";

const ActividadController = {
  get: async (req, res) => {
    try {
      const actividad = await ActividadService.getAll();
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const actividad = await ActividadService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const master = formatMaster(req.body);
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
    const master = formatMaster(req.body);
    const tecnico = req.body.tecnico;
    const detalle = req.body.detalle;
    try {
      const actividad = await ActividadService.update({
        id: req.params.id,
        master,
        tecnico,
        detalle,
      });
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const actividad = await ActividadService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default ActividadController;

const formatMaster = (body) => {
  return {
    idcliente: body.idcliente.idcliente,
    idusuario: body.idusuario.idusuario,
    idestadocobro: 1,
    solicitante: body.solicitante,
    comentario: body.comentario,
    fecha: body.fecha,
  };
};
