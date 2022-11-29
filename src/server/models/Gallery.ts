import { IGallery, IImage } from "interfaces";
import { model, Model, models, Schema } from "mongoose";
import { Gallery } from "../../components/pages/homePage/galleries/Galleries";

const ImageSchema = new Schema<IImage>({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
});

const GallerySchema = new Schema<IGallery>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
  show: {
    type: Boolean,
    required: true,
    default: true,
  },
  images: [ImageSchema],
});

const Gallery: Model<IGallery> =
  models.Gallery || model("Gallery", GallerySchema);

export default Gallery;
