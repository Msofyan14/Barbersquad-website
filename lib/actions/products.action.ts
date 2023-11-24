"use server";
import { connectToDB } from "../mongoose";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Products from "../model/products.model";

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

    const totalTeamCount = await Products.countDocuments(query);

    const pageCount = Math.ceil(totalTeamCount / pageSize);

    return { data, pageCount };
  } catch (error: any) {
    const errorMessage = error.message || "Failed to get teams ";
    throw new Error(errorMessage);
  }
}
