import { ERoles, IDisplayUser } from "interfaces";

export const mockUsers: IDisplayUser[] = [
  {
    _id: "1",
    dispName: "Alfa Baluarte",
    nickname: "alfabaluarte",
    phoneNumber: "6181707984",
    totalReservedLots: 0,
    role: ERoles.admin,
  },
  {
    _id: "2",
    dispName: "Percy Rodriguez",
    nickname: "percyrdz",
    phoneNumber: "6181808948",
    totalReservedLots: 0,
    role: ERoles.admin,
  },
  {
    _id: "3",
    dispName: "Ricardo Sandoval",
    nickname: "ricksan",
    phoneNumber: "6182315784",
    totalReservedLots: 0,
    role: ERoles.seller,
  },
];
