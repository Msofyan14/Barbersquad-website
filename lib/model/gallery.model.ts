import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  images: [
    {
      type: String,
      requred: true,
    },
  ],
});

const Gallery =
  mongoose.models.User || mongoose.model("Gallery", gallerySchema);

export default Gallery;
