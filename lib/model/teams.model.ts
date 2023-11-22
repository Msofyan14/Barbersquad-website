import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teams = mongoose.models.Teams || mongoose.model("Teams", barberSchema);

export default Teams;
