import FolderService from "../services/folder.service";

const FolderController = {
  get: async (req, res) => {
    try {
      const result = await FolderService.getAll();
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      /* istanbul ignore next */ 
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const result = await FolderService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const params = {
      descripcion: req.body.descripcion
    }
    try {
      const result = await FolderService.create(params);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    const params = {
      descripcion: req.body.descripcion
    }
    try {
      const result = await FolderService.update({
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
      const result = await FolderService.delete(req.params.id);
      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default FolderController;
