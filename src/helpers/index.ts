import { ETypes } from "interfaces";

export function getLotTypeKeyByValue(value: string) {
  const indexOfS = Object.values(ETypes).indexOf(value as unknown as ETypes);
  const key = Object.keys(ETypes)[indexOfS];
  return key;
}
