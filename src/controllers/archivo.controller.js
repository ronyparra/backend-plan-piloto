import ArchivoService from "../services/archivo.service";

const ArchivoController = {
  get: async (req, res) => {
    try {
      const result = await ArchivoService.getAll();
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      /* istanbul ignore next */ 
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const result = await ArchivoService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const params = {
      idcliente: req.body.idcliente.idcliente,
      idcarpeta: req.body.idcarpeta.idcarpeta,
      descripcion: req.body.descripcion,
      comentario: req.body.comentario,
      filepath: req.body.filepath
    }
    try {
      const result = await ArchivoService.create(params);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    const params = {
      idcliente: req.body.idcliente.idcliente,
      idcarpeta: req.body.idcarpeta.idcarpeta,
      descripcion: req.body.descripcion,
      comentario: req.body.comentario,
      filepath: req.body.filepath
    }
    try {
      const result = await ArchivoService.update({
        ...params,
        id: req.params.id,
      });
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const result = await ArchivoService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default ArchivoController;
