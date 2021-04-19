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
    const params = {
      descripcion: req.body.descripcion, 
      precio: req.body.precio,
      idmoneda: req.body.idmoneda.idmoneda,
      idcategoria: req.body.idcategoria.idcategoria
    }
    try {
      const concepto = await ConceptoService.create(params);
      return res.status(200).json({ status: 200, data: concepto });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    const params = {
      descripcion: req.body.descripcion, 
      precio: req.body.precio,
      idmoneda: req.body.idmoneda.idmoneda,
      idcategoria: req.body.idcategoria.idcategoria
    }
    try {
      const users = await ConceptoService.update({
        ...params,
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
