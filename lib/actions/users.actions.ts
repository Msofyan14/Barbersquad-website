"use server";
import bcrypt from "bcrypt";

import { connectToDB } from "../mongoose";
import Users from "../model/users.model";
import { FormLoginValidation } from "../validations/types";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

type LoginTypes = z.infer<typeof FormLoginValidation>;

export async function authenticate(email: string, password: string) {
  try {
    connectToDB();

    const user = await Users.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Incorrect password");
    }

    return user;
  } catch (error: any) {
    const errorMessage = error.message || "Failed to login user";
    throw new Error(errorMessage);
  }
}

export async function getUserByEmail(email: string) {
  try {
    connectToDB();

    const user = await Users.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: any) {
    throw new Error(`Failed to retrieve user : ${error.message}`);
  }
}

export async function loginUser(data: LoginTypes) {
  try {
    await signIn("credentials", data);
  } catch (error: any) {
    // if ((error as Error).message.includes("CredentialsSignin")) {
    //   return "CredentialSignin";
    // }
    // throw error;
    const errorMessage = error.message || "Failed to login user";
    throw new Error(errorMessage);
  }
}
