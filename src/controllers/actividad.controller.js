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
      idcliente: req.idcliente.idcliente,
      idusuario: req.idusuario.idusuario,
      idestadocobro: 1,
      solicitante: req.solicitante,
      comentario: req.comentario,
      fecha: req.fecha,
    };
    const detailTecnico = req.body.tecnico.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc = acc + `($$,${curr.idusuario.idusuario},${curr.precio})`);
    });
    const detailConcepto = req.body.detalle.reduce((acc, curr) => {
      if (acc !== "") acc = acc + ",";
      return (acc =
        acc +
        `($$,${curr.idconcepto.idconcepto},${curr.precio},${curr.cantidad})`);
    });
    try {
      const actividad = await ActividadService.create({
        master,
        detailTecnico,
        detailConcepto,
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
