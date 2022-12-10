import { ILot } from "./Lot";

export const enum ERoles {
  admin = "administrador",
  seller = "vendedor",
}
export interface IDisplayUser {
  _id: string;
  dispName: string;
  role: ERoles;
  nickname: string;
  phoneNumber: string;
  totalReservedLots: number;
}
export interface IUser extends IDisplayUser {
  password: string;
  reservedLots: string[]; // Lot id []
}

export interface IFullUser extends IDisplayUser {
  reservedLots: ILot[];
}
