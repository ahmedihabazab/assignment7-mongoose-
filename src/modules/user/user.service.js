import { findOne, findOneAndDelete, findOneAndUpdate } from "../../DB/repo/db.repo.js";
import { usersModel } from "../../models/users.model.js";

export async function update(userId, updatedData) {
  
  const isIdExist = await findOne({
    model: usersModel,
    filter: { _id: userId },
  });
  if (!isIdExist) {
    throw new Error("User not found");
  }

  const isEmailExist = await findOne({
    model: usersModel,
    filter: {
      email: updatedData.email,
      _id: { $ne : userId}
    },
  });
  if (isEmailExist) {
    throw new Error("Email already exists");
  }

  const {name , email , phone , age} = updatedData 
  const updatedDataAllowed = {name , email , phone  ,age}

  const user = await findOneAndUpdate({
    model: usersModel,
    filter: { _id: userId },
    updatedData : updatedDataAllowed,
  });
  if (user) {
    return { message: "User Updated" };
  }
}

export async function deleteUser(userId) {
  const deleteQuery = await findOneAndDelete({model : usersModel , filter : {_id : userId }})
  if(!deleteQuery){
    throw new Error("User not found");
  }
  return { message: "User Deleted" };
}

export async function getUser(userId) {
  const getQuery = await usersModel.findById(userId)
 if(!getQuery){
  return {message : "User not found" }
 }

 return getQuery
}