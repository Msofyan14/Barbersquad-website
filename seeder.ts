import { initialUsers } from "./lib/data.placeholder";
import Users from "./lib/model/users.model";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: __dirname + "/.env" });
// console.log(process.env.MONGODB_URI);

mongoose
  .connect(
    "mongodb+srv://yanzsofyan:yanzsofyan97@cluster0.dko9n1j.mongodb.net/barbersquad"
  )
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("DB Connection Failed", error.message));

console.log("users schema", Users);

const importData = async () => {
  try {
    // delete previous data | avoid duplication
    await Users.deleteMany();

    for (const userData of initialUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 8);
      userData.password = hashedPassword;
    }

    await Users.insertMany(initialUsers);

    console.log("Data imported");

    // 0 is a success code and 1 (or another number) can be a failure code.
    process.exit();
  } catch (error: any) {
    console.log("Data not imported", error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Users.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log("Data not destroyed");
    process.exit(1);
  }
};
// console.log(process.argv);

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
