import mongoose, { Schema } from "mongoose";
const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
  },
  { timestamps: true, optimisticConcurrency: true },
);

export const usersModel = mongoose.model("users" , usersSchema)
