import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    requred: true,
  },
});

const Teams = mongoose.models.User || mongoose.model("Teams", barberSchema);

export default Teams;
