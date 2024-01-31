import { ILot, StatusType, statusType } from "interfaces";
import { connect, disconnect } from "server/database";
import { Lot } from "server/models";
import { getUser } from "./users";
import { getClient } from "./clients";
import { Types } from "mongoose";

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

export const getLotById = async (
  lotId: string
): Promise<ILot | { error: string }> => {
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

export const setLotBuyer = async (
  lotId: string,
  buyerId: string,
  price?: string
) => {
  try {
    const buyer = await getClient(buyerId);
    if (!buyer) return null;
    console.log({ buyer });
    const lot = await Lot.findByIdAndUpdate(
      lotId,
      {
        buyer: new Types.ObjectId(buyerId),
        status: statusType.reserved,
        price,
      },
      { new: true }
    );
    return lot;
  } catch (error) {
    await disconnect();
    return { error: String(error) };
  }
};

export const getLotsByClientId = async (clientId: string) => {
  try {
    await connect();
    const lots = await Lot.find({ buyer: clientId });
    await disconnect();
    return lots;
  } catch (error) {
    await disconnect();
    return null;
  }
};
