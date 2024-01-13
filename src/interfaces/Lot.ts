import { ObjectValues } from "interfaces";
import { Schema } from "mongoose";

export const lotType = {
  a: "tipo a",
  b: "tipo b",
  c: "comercial",
} as const;

export const lotTypeArray = Object.values(lotType);

export type LotType = ObjectValues<typeof lotType>;

export const statusType = {
  payed: "pagado",
  sold: "vendido",
  reserved: "reservado",
  available: "disponible",
} as const;

export const statusTypeArray = Object.values(statusType);

export type StatusType = ObjectValues<typeof statusType>;

export interface ILot {
  _id: string;
  xml: string;
  section: string;
  num: number;
  area: number;
  price: number;
  type: LotType;
  status: StatusType;
  buyer?: string | Schema.Types.ObjectId;
  seller?: string | Schema.Types.ObjectId;
}
