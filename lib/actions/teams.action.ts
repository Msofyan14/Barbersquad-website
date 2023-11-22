"use server";

import { FilterQuery } from "mongoose";
import Teams from "../model/teams.model";
import { connectToDB } from "../mongoose";

type TTeams = {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
};

export async function getTeams({
  searchString = "",
  pageNumber = 1,
  pageSize = 10,
}: TTeams) {
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

    const data = await Teams.find(query)
      .sort({ createdAt: "desc", _id: "asc" })
      .skip(skipAmount)
      .limit(pageSize);

    if (!data) {
      throw new Error("Teams ot found");
    }

    const totalTeamCount = await Teams.countDocuments(query);

    const pageCount = Math.ceil(totalTeamCount / pageSize);

    return { data, pageCount };
  } catch (error: any) {
    const errorMessage = error.message || "Failed to get teams ";
    throw new Error(errorMessage);
  }
}
