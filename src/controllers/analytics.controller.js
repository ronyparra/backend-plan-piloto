import AnalyticsService from "../services/analytics.service";
import { parse_date, substract_days, calc_diff_days } from "../util/date.util";
const analyticsController = {
  getActividad: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const diffDesdeHasta = calc_diff_days(hasta, desde);
      const hastaAnterior = substract_days(desde, 1);
      const desdeAnterior = substract_days(hastaAnterior, diffDesdeHasta);

      const data = [
        {
          title: "Periodo Anterior",
          color: "pink lighten-5",
          detalle: await AnalyticsService.getSaldoGeneral(
            desdeAnterior,
            hastaAnterior
          ),
        },
        {
          title: "Periodo Actual",
          detalle: await AnalyticsService.getSaldoGeneral(desde, hasta),
        },
        {
          title: "Cobrado",
          detalle: await AnalyticsService.getSaldoPorEstado(
            desde,
            hasta,
            "=",
            3
          ),
        },
        {
          title: "Por Cobrar",
          detalle: await AnalyticsService.getSaldoPorEstado(
            desde,
            hasta,
            "!=",
            3
          ),
        },
      ];

      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getPendientes: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const diffDesdeHasta = calc_diff_days(hasta, desde);
      const hastaAnterior = substract_days(desde, 1);
      const desdeAnterior = substract_days(hastaAnterior, diffDesdeHasta);

      const data = [
        {
          title: "Periodo Anterior",
          data: await AnalyticsService.getPendientes(
            desdeAnterior,
            hastaAnterior
          ),
        },
        {
          title: "Periodo Actual",
          data: await AnalyticsService.getPendientes(desde, hasta),
        },
      ];

      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getCliente: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const data = await AnalyticsService.getCliente(desde, hasta);
      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getConcepto: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const data = await AnalyticsService.getConcepto(desde, hasta);
      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getTecnico: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const data = await AnalyticsService.getTecnico(desde, hasta);
      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getCategoria: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const data = await AnalyticsService.getCategoria(desde, hasta);
      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getEstados: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const old = req.query.old === "true" ? true : false;
      const data = await AnalyticsService.getEstados(desde, hasta, old);
      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
  getCobroTecnico: async (req, res) => {
    try {
      const desde = parse_date(req.query.desde);
      const hasta = parse_date(req.query.hasta);
      const data = await AnalyticsService.getCobroTecnico(desde, hasta);
      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default analyticsController;
