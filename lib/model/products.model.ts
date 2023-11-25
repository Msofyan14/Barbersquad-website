import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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

const Products =
  mongoose.models.Products || mongoose.model("Products", productsSchema);

export default Products;
