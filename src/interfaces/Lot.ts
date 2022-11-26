import { Schema } from "mongoose";

export enum ETypes {
  a = "tipo a",
  b = "tipo b",
  c = "comercial",
}

export enum EStatus {
  payed = "pagado",
  sold = "vendido",
  reserved = "reservado",
  available = "disponible",
}

export interface ILot {
  _id: string;
  xml: string;
  section: string;
  num: number;
  area: number;
  price: number;
  type: ETypes;
  status: EStatus;
  signDate?: string;
  buyer?: string | Schema.Types.ObjectId;
  seller?: string | Schema.Types.ObjectId;
  vendorName?: string;
}
