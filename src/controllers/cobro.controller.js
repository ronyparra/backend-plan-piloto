import CobroService from "../services/cobro.service";
import { current_date, parse_date } from "../util/date.util";
const CobroController = {
  get: async (req, res) => {
    try {
      const params = {
        idcliente:
          req.query.cliente !== "undefined" ? req.query.cliente : undefined,
        idusuario:
          req.query.idusuario !== "undefined" ? req.query.idusuario : undefined,
        desde: parse_date(req.query.desde),
        hasta: parse_date(req.query.hasta),
        idestadocobro:
          req.query.estado !== "undefined" ? req.query.estado : undefined,
      };
      const response = await CobroService.getAll(params);
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
      const response = await CobroService.delet(req.params.id);
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default CobroController;
