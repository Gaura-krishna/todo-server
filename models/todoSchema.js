const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    currentStatus: {
      type: String,
      enum: ["Not Started","Pending", "In Progress", "Completed"],
      default: "Not Started",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // createdAt & updatedAt
);

module.exports = mongoose.model("Todo", todoSchema);
