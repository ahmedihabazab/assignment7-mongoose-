import mongoose, { Schema, Types } from "mongoose";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === value.toUpperCase() ? false : true;
        },
        message: function (props) {
          return `${props.value} is not valid , entirely uppercase `;
        },
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true },
);

export const notesModel = mongoose.model("notes" , notesSchema)