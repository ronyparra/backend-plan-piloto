import AnalyticsService from "../services/analytics.service";
import { parse_date, substract_days } from "../util/date.util";
const analyticsController = {
  getActividad: async (req, res) => {
    const periodoAnterior = substract_days(parse_date(req.query.desde), 1);
    const desde = parse_date(req.query.desde);
    const hasta = parse_date(req.query.hasta);
    try {
      const data = [
        {
          title: "Periodo Anterior",
          color: "pink lighten-5",
          detalle: await AnalyticsService.getSaldoGeneral('1900-10-10',periodoAnterior),
        },
        {
          title: "Periodo Actual",
          detalle: await AnalyticsService.getSaldoGeneral(desde,hasta),
        },
        {
          title: "Cobrado",
          detalle: await AnalyticsService.getSaldoPorEstado(desde,hasta, '=', 3),
        },
        {
          title: "Por Cobrar",
          detalle: await AnalyticsService.getSaldoPorEstado(desde,hasta, '!=', 3),
        },
      ];

      return res.status(200).json({ status: 200, data: data });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};

export default analyticsController;
