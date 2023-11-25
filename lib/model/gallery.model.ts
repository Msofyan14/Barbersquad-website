import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        requred: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;
