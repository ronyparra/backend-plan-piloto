import MonedaService from "../services/moneda.service";

const MonedaController = {
  get: async (req, res) => {
    try {
      const response = await MonedaService.getAll();
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default MonedaController;
