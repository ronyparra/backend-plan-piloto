import ActividadService from "../services/actividad.service";
import { parse_date } from "../util/date.util";
import { formatMaster } from '../services/actividad.service/formatter';

const ActividadController = {
  get: async (req, res) => {
    const params = {
      idcliente:
        req.query.cliente !== "undefined" ? req.query.cliente : undefined,
      idsucursal:
        req.query.sucursal !== "undefined" ? req.query.sucursal : undefined,
      desde: parse_date(req.query.desde),
      hasta: parse_date(req.query.hasta),
      idestadocobro:
        req.query.estado !== "undefined" ? req.query.estado : undefined,
    };
    try {
      const actividad = await ActividadService.getAll(params);
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
  changeStatus: async (req, res) => {
    const idusuario = req.decoded.id;
    try {
      const actividad = await ActividadService.changeStatus({...req.body, idusuario});
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  create: async (req, res) => {
    const tecnico = req.body.tecnico;
    const detalle = req.body.detalle;
    const actividad_pendiente = req.body.actividad_pendiente;
    try {
      const actividad = await ActividadService.create({
        master: formatMaster(req.body),
        tecnico,
        detalle,
        actividad_pendiente,
      });
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  update: async (req, res) => {
    const tecnico = req.body.tecnico;
    const detalle = req.body.detalle;
    const actividad_pendiente = req.body.actividad_pendiente;
    try {
      const actividad = await ActividadService.update({
        id: req.params.id,
        master: formatMaster(req.body),
        tecnico,
        detalle,
        actividad_pendiente,
      });
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const actividad = await ActividadService.delet(req.params.id);
      return res.status(200).json({ status: 200, data: actividad });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default ActividadController;


