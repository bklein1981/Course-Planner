const { Schema, model } = require("mongoose");

const { Course } = require("./Course");

const subjectSchema = new Schema(
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

const Subject = model('Subject', subjectSchema);

module.exports = Subject;
