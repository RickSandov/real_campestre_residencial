import { ILot, StatusType, statusType } from "interfaces";
import { connect, disconnect } from "server/database";
import { Lot } from "server/models";

export const getLots = async () => {
  try {
    await connect();
    const lots = await Lot.find();
    await disconnect();
    return lots;
  } catch (error) {
    await disconnect();
  }
};

export const getLotById = async (lotId: string) => {
  try {
    await connect();
    const lot = await Lot.findById(lotId);
    await disconnect();
    if (!lot) {
      throw new Error("No existe");
    }
    return lot;
  } catch (error) {
    await disconnect();
    return { error: String(error) };
  }
};

export const updateLotInfo = async (
  lotId: string,
  newLotInfo: Partial<ILot>
) => {
  try {
    await connect();
    const lot = await Lot.findByIdAndUpdate(lotId, newLotInfo);
    await disconnect();
    if (!lot) {
      throw new Error("No existe");
    }
    return lot;
  } catch (error) {
    await disconnect();
    return { error: String(error) };
  }
};

export const updateLotStatus = async (lotId: string, newStatus: StatusType) => {
  try {
    const lot = await getLotById(lotId);
    return lot;
  } catch (error) {
    await disconnect();
    return { error: String(error) };
  }
};
