import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    requred: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
});

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
