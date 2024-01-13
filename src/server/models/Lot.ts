import { ILot, lotType, lotTypeArray } from "interfaces";
import { Schema, model, models, Model } from "mongoose";
import { statusType, statusTypeArray } from "../../interfaces/Lot";

export const LotSchema = new Schema<ILot>({
  xml: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: lotTypeArray,
    default: lotType.a,
  },
  status: {
    type: String,
    enum: statusTypeArray,
    default: statusType.available,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Lot: Model<ILot> = models.Lot || model("Lot", LotSchema);

export default Lot;
