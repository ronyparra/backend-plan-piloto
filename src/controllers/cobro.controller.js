import CobroService from "../services/cobro.service";
import { current_date } from "../util/date.util";
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
    const params = {
      fechacobro: current_date(),
      idusuariocobro: req.decoded.id,
      comentario: req.body.comentario,
      saldocobrado: req.body.saldocobrado,
      retencion: req.body.retencion,
      actividad_cobro: req.body.actividad_cobro,
      idestadocobro: req.body.idestadocobro.idestadocobro,
      id: req.params.id,
    };
    try {
      const response = await CobroService.update(params);
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