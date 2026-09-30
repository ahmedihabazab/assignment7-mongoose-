import mongoose from "mongoose";
import { createDocument, findOne } from "../../DB/repo/db.repo.js";
import { usersModel } from "../../models/users.model.js";

export async function signup(reqBody) {
  const isExist = await usersModel.findOne({ email : reqBody.email})

  if (isExist) {
    throw new Error("User already exists")
  }

  const userCreated = await createDocument({modelName : usersModel , data : reqBody})

  return userCreated
}

export async function login(reqBody) {
  const user = await findOne({model : usersModel , filter : reqBody})
  if(!user){
    throw new Error("User already exists")
  }

  return user
}