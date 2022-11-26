import { EStatus, ETypes, ILot } from "interfaces";
import { Schema, model, models, Model } from "mongoose";

const LotSchema = new Schema<ILot>({
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
    default: ETypes.a,
    enum: Object.values(ETypes),
  },
  status: {
    type: String,
    default: EStatus.available,
    enum: Object.values(EStatus),
  },
  signDate: {
    type: String,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  vendorName: {
    type: String,
  },
});

const Lot: Model<ILot> = models.Lot || model("Lot", LotSchema);

export default Lot;
