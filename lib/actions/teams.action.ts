"use server";

import { FilterQuery } from "mongoose";
import Teams from "../model/teams.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

type TGetTeams = {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
};

export async function getTeams({
  searchString = "",
  pageNumber = 1,
  pageSize = 10,
}: TGetTeams) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof Teams> = {
      // id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          email: { $regex: regex },
        },
        { name: { $regex: regex } },
      ];
    }

    const res = await Teams.find(query)
      .sort({ createdAt: "desc", _id: "asc" })
      .skip(skipAmount)
      .limit(pageSize);

    if (!res) {
      throw new Error("Teams not found");
    }

    const data = res.map((team) => ({
      ...team._doc,
      _id: team._id.toString(),
    }));

    const totalTeamCount = await Teams.countDocuments(query);

    const pageCount = Math.ceil(totalTeamCount / pageSize);

    return { data, pageCount };
  } catch (error: any) {
    const errorMessage = error.message || "Failed to get teams ";
    throw new Error(errorMessage);
  }
}

export type TDataTeam = {
  _id?: string | undefined;
  name: string;
  email: string;
  whatsapp: number;
  image: string;
};

export async function addTeams(data: TDataTeam, pathname: string) {
  try {
    connectToDB();

    const newTeam = await Teams.create(data);

    if (!newTeam) {
      throw new Error("Failed to add team");
    }

    await newTeam.save();

    revalidatePath(pathname);
  } catch (error: any) {
    const errorMessage = error.message || "Failed to add team ";
    throw new Error(errorMessage);
  }
}

export async function getTeamByid(id: string) {
  try {
    connectToDB();

    const getTeam = await Teams.findOne({ _id: id }, { __v: 0 });

    if (!getTeam) {
      throw new Error("Failed to retrieve team");
    }

    return {
      ...getTeam._doc,
      _id: getTeam._id.toString(),
      createdAt: getTeam.createdAt.toISOString(),
      updatedAt: getTeam.updatedAt.toISOString(),
    };
  } catch (error: any) {
    const errorMessage = error.message || "Failed  retrieve team ";
    throw new Error(errorMessage);
  }
}

type TEditTeams = {
  id: string | undefined;
  data: TDataTeam;
  pathname: string;
};

export async function editTeam({ id, data, pathname }: TEditTeams) {
  try {
    connectToDB();

    console.log(id);
    console.log(data);

    const editTeam = await Teams.findByIdAndUpdate({ _id: id }, data);

    if (!editTeam) {
      throw new Error("Failed edit team");
    }

    await editTeam.save();

    revalidatePath(pathname);

    return deleteTeam;
  } catch (error: any) {
    const errorMessage = error.message || "Failed  edit team ";
    throw new Error(errorMessage);
  }
}

export async function deleteTeam(id: string, pathname: string) {
  try {
    connectToDB();

    const deleteTeam = await Teams.findOneAndDelete({ _id: id });

    if (!deleteTeam) {
      throw new Error("Failed delete team");
    }
    revalidatePath(pathname);

    return deleteTeam;
  } catch (error: any) {
    const errorMessage = error.message || "Failed  delete team ";
    throw new Error(errorMessage);
  }
}
