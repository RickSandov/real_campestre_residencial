import { Doc, IClient } from "interfaces";
import { Schema, model, models } from "mongoose";
import { LotSchema } from "./Lot";

const Doc = new Schema<Doc>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    trim: true,
  },
});

const Client = new Schema<IClient>({
  registeredBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  registeredByName: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  docs: [
    {
      type: Doc,
      required: false,
    },
  ],
  reservedLots: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      default: [],
      ref: "Lot",
    },
  ],
});

export default models.Client || model("Client", Client);
