"use server";
import { connectToDB } from "../mongoose";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Products from "../model/products.model";
import { IGallery } from "@/types";
import Gallery from "../model/gallery.model";

type TGetGallery = {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
};

export async function getGallery({
  searchString = "",
  pageNumber = 1,
  pageSize = 10,
}: TGetGallery) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof Gallery> = {
      // id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          name: { $regex: regex },
        },
      ];
    }

    const res = await Gallery.find(query)
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

    const totalGalleryCount = await Gallery.countDocuments(query);

    const pageCount = Math.ceil(totalGalleryCount / pageSize);

    return { data, pageCount, totalGalleryCount };
  } catch (error: any) {
    const errorMessage = error.message || "Failed to get teams ";
    throw new Error(errorMessage);
  }
}

export async function getGalleryByid(id: string | undefined) {
  try {
    connectToDB();

    const getGallery = await Gallery.findOne({ _id: id }, { __v: 0 });

    if (!getGallery) {
      throw new Error("Failed to retrieve gallery");
    }

    return {
      ...getGallery._doc,
      _id: getGallery._id.toString(),
      createdAt: getGallery.createdAt.toISOString(),
      updatedAt: getGallery.updatedAt.toISOString(),
    };
  } catch (error: any) {
    const errorMessage = error.message || "Failed  retrieve gallery ";
    throw new Error(errorMessage);
  }
}

export async function addGallery(data: IGallery, pathname: string) {
  console.log(data);

  try {
    connectToDB();

    const newGallery = await Gallery.create(data);

    if (!newGallery) {
      throw new Error("Failed to add gallery");
    }

    await newGallery.save();

    revalidatePath(pathname);
  } catch (error: any) {
    const errorMessage = error.message || "Failed to add gallery ";
    throw new Error(errorMessage);
  }
}

type TEditGallery = {
  id: string | undefined;
  data: IGallery;
  pathname: string;
};

export async function editGallery({ id, data, pathname }: TEditGallery) {
  try {
    connectToDB();

    const editGallery = await Gallery.findByIdAndUpdate({ _id: id }, data);

    if (!editGallery) {
      throw new Error("Failed edit gallery");
    }

    await editGallery.save();

    revalidatePath(pathname);
  } catch (error: any) {
    const errorMessage = error.message || "Failed  edit gallery ";
    throw new Error(errorMessage);
  }
}

export async function deleteGallery(id: string | undefined, pathname: string) {
  try {
    connectToDB();

    const deleteGallery = await Gallery.findOneAndDelete({ _id: id });

    if (!deleteGallery) {
      throw new Error("Failed delete gallery");
    }
    revalidatePath(pathname);
  } catch (error: any) {
    const errorMessage = error.message || "Failed  delete gallery ";
    throw new Error(errorMessage);
  }
}
