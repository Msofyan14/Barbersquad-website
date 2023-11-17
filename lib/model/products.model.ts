import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  images: [
    {
      type: String,
      requred: true,
    },
  ],
});

const Products =
  mongoose.models.User || mongoose.model("Products", productsSchema);

export default Products;
