const { Schema, model } = require("mongoose");

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
        ref: "Course",
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
