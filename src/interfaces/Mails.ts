import { ILot } from "./Lot";

export interface IContactForm {
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  selectedLot?: ILot;
}
