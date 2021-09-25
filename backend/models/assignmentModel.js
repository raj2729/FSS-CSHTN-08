const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    isCertified: {
      type: Boolean,
      required: true,
      default: false,
    },
    assignmentLink: {
      type: String,
      // required: true,
    },
    assignmentScreenshotLink: {
      type: String,
      // required: true,
    },
    assignmentStatus: {
      type: String,
      required: true,
      default: "unsubmit",
    },
    assignmentComment: {
      type: String,
      // required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
