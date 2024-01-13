import { Types } from "mongoose";
import { ILot } from "./Lot";

export interface Doc {
  name: string;
  url: string;
  key: string;
}

export interface IDisplayClient {
  registeredByName: string;
  name: string;
  phoneNumber: string;
  _id: string | Types.ObjectId;
}

export interface IClient extends IDisplayClient {
  registeredBy: string | Types.ObjectId;
  docs: Doc[];
  reservedLots: string[] | Types.ObjectId[];
}
