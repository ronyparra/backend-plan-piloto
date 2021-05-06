import db from "../../db";
import query from "./query";

export const getSaldoPorEstado = async (desde, hasta, condicion, idestado) => {
  return await db
    .query(query.estado(condicion), [desde, hasta, idestado])
    .then((r) => r.rows.map((x) => x.rows));
};

export const getSaldoGeneral = async (desde, hasta) => {
  return await db
    .query(query.general, [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};

export const getPendientes = async (desde, hasta) => {
  return await db
    .query(query.pendiente, [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};

export const getCliente = async (desde, hasta) => {
  return await db
    .query(query.cliente, [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};

export const getConcepto = async (desde, hasta) => {
  return await db
    .query(query.concepto, [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};
export const getTecnico = async (desde, hasta) => {
  return await db
    .query(query.tecnico, [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};
export const getCategoria = async (desde, hasta) => {
  return await db
    .query(query.categoria, [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};
export const getEstados = async (desde, hasta, old) => {
  return await db
    .query(query.estados(old), [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};
export const getCobroTecnico = async (desde, hasta) => {
  return await db
    .query(query.cobro, [desde, hasta])
    .then((r) => r.rows.map((x) => x.rows));
};
