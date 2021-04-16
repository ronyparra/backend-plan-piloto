import db from "../../db";
import query from "./query";

export const getSaldoPorEstado = async ( desde, hasta, condicion, idestado ) => {
  try {
    return await db
      .query(query.estado(condicion), [desde, hasta, idestado])
      .then((r) => r.rows.map((x) => x.rows));
  } catch (e) {
    console.log(e)
    throw e;
  }
};

export const getSaldoGeneral= async ( desde, hasta ) => {
  try {
    return await db
      .query(query.general, [desde, hasta])
      .then((r) => r.rows.map((x) => x.rows));
  } catch (e) {
    throw e;
  }
};

export const getPendientes= async ( desde, hasta ) => {
  try {
    return await db
      .query(query.pendiente, [desde, hasta])
      .then((r) => r.rows.map((x) => x.rows));
  } catch (e) {
    throw e;
  }
};

export const getCliente= async ( desde, hasta ) => {
  try {
    return await db
      .query(query.cliente, [desde, hasta])
      .then((r) => r.rows.map((x) => x.rows));
  } catch (e) {
    throw e;
  }
};

export const getConcepto= async ( desde, hasta ) => {
  try {
    return await db
      .query(query.concepto, [desde, hasta])
      .then((r) => r.rows.map((x) => x.rows));
  } catch (e) {
    throw e;
  }
};
export const getTecnico= async ( desde, hasta ) => {
  try {
    return await db
      .query(query.tecnico, [desde, hasta])
      .then((r) => r.rows.map((x) => x.rows));
  } catch (e) {
    throw e;
  }
};
