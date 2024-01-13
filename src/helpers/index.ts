import { LotType, lotType, lotTypeArray } from "interfaces";

export function getLotTypeKeyByValue(value: string) {
  const indexOfS = Object.values(lotTypeArray).indexOf(value as LotType);
  const key = Object.keys(lotType)[indexOfS];
  return key;
}

export function prettyPhoneNumber(phoneNumber: string) {
  return (
    phoneNumber.slice(0, 3) +
    " " +
    phoneNumber.slice(3, 6) +
    " " +
    phoneNumber.slice(6)
  );
}
