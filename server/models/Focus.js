const { Schema, model } = require("mongoose");

const { Course } = require("./Course");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
