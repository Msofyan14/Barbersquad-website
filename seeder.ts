import {
  initialGallery,
  initialTeams,
  initialUsers,
  intialProducts,
} from "./lib/data.placeholder";
import Users from "./lib/model/users.model";
import Teams from "./lib/model/teams.model";
import Products from "./lib/model/products.model";
import Gallery from "./lib/model/gallery.model";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: __dirname + "/.env" });
// console.log(process.env.MONGODB_URI);

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("DB Connection Failed", error.message));

console.log("users schema", Users);

const importData = async () => {
  try {
    // delete previous data | avoid duplication
    await Users.deleteMany();
    await Teams.deleteMany();
    await Products.deleteMany();
    await Gallery.deleteMany();

    for (const userData of initialUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 8);
      userData.password = hashedPassword;
    }

    await Users.insertMany(initialUsers);
    await Teams.insertMany(initialTeams);
    await Products.insertMany(intialProducts);
    await Gallery.insertMany(initialGallery);

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
    await Teams.deleteMany();
    await Products.deleteMany();
    await Gallery.deleteMany();

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
