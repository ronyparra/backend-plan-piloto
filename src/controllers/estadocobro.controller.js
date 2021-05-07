import EstadoCobroService from "../services/estadocobro.service";

const EstadoCobroController = {
  get: async (req, res) => {
    try {
      const response = await EstadoCobroService.getAll();
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      /* istanbul ignore next */ 
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default EstadoCobroController;
