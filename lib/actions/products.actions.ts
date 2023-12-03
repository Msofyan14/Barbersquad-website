"use server";
import { connectToDB } from "../mongoose";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Products from "../model/products.model";
import { IProducts } from "@/types";

type TGetTeams = {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
};

export async function getProducts({
  searchString = "",
  pageNumber = 1,
  pageSize = 10,
}: TGetTeams) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof Products> = {
      // id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          name: { $regex: regex },
        },
      ];
    }

    const res = await Products.find(query)
      .sort({ createdAt: "desc", _id: "asc" })
      .skip(skipAmount)
      .limit(pageSize);

    if (!res) {
      throw new Error("Products not found");
    }

    const data = res.map((team) => ({
      ...team._doc,
      _id: team._id.toString(),
    }));

    const totalProductCount = await Products.countDocuments(query);

    const pageCount = Math.ceil(totalProductCount / pageSize);

    return { data, pageCount, totalProductCount };
  } catch (error: any) {
    const errorMessage = error.message || "Failed to get teams ";
    throw new Error(errorMessage);
  }
}

export async function getProductByid(id: string | undefined) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    connectToDB();

    const getTeam = await Products.findOne({ _id: id }, { __v: 0 });

    if (!getTeam) {
      throw new Error("Failed to retrieve products");
    }

    return {
      ...getTeam._doc,
      _id: getTeam._id.toString(),
      createdAt: getTeam.createdAt.toISOString(),
      updatedAt: getTeam.updatedAt.toISOString(),
    };
  } catch (error: any) {
    const errorMessage = error.message || "Failed  retrieve products ";
    throw new Error(errorMessage);
  }
}

export async function addProduct(data: IProducts, pathname: string) {
  try {
    connectToDB();

    const newProduct = await Products.create(data);

    if (!newProduct) {
      throw new Error("Failed to add Product");
    }

    await newProduct.save();

    revalidatePath(pathname);
  } catch (error: any) {
    const errorMessage = error.message || "Failed to add Product ";
    throw new Error(errorMessage);
  }
}

type TEditProduct = {
  id: string | undefined;
  data: IProducts;
  pathname: string;
};

export async function editProduct({ id, data, pathname }: TEditProduct) {
  console.log(data);

  try {
    connectToDB();

    const editProduct = await Products.findByIdAndUpdate({ _id: id }, data);

    if (!editProduct) {
      throw new Error("Failed edit product");
    }

    await editProduct.save();

    revalidatePath(pathname);
  } catch (error: any) {
    const errorMessage = error.message || "Failed  edit product ";
    throw new Error(errorMessage);
  }
}

export async function deleteProduct(id: string | undefined, pathname: string) {
  try {
    connectToDB();

    const deleteTeam = await Products.findOneAndDelete({ _id: id });

    if (!deleteTeam) {
      throw new Error("Failed delete product");
    }
    revalidatePath(pathname);
  } catch (error: any) {
    const errorMessage = error.message || "Failed  delete product ";
    throw new Error(errorMessage);
  }
}
