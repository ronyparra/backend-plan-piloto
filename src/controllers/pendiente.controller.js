import PendienteService from "../services/pendiente.service";
import {parse_date} from '../util/date.util';

const PendienteController = {
  getDashboard: async (req, res) => {
    try {
      const response = await PendienteService.getDashboard(req.decoded.id);
      return res.status(200).json({ status: 200, data: response });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const pendiente = await PendienteService.getAll();
      return res.status(200).json({ status: 200, data: pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const pendiente = await PendienteService.getById(req.params.id);
      return res.status(200).json({ status: 200, data: pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const insert = {
      idtipo_pendiente: req.body.idtipo_pendiente.idtipo_pendiente,
      fecha: parse_date(req.body.fecha), 
      descripcion: req.body.descripcion,
      pendiente_tecnico: req.body.pendiente_tecnico
    };
    try {
      const pendiente = await PendienteService.create({ ...insert });
      return res.status(200).json({ status: 200, data: pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    const update = {
      idtipo_pendiente: req.body.idtipo_pendiente.idtipo_pendiente,
      fecha: parse_date(req.body.fecha),
      descripcion: req.body.descripcion,
      pendiente_tecnico: req.body.pendiente_tecnico
    };
    try {
      const pendiente = await PendienteService.update({
        ...update,
        id: req.params.id,
      });
      return res.status(200).json({ status: 200, data: pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const pendiente = await PendienteService.delet(req.params.id);
      return res.status(200).json({ status: 200, data: pendiente });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default PendienteController;
