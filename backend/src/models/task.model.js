import mongoose from "mongoose";
import connection from "../utils/mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    groupId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Group",
    },
    finished: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      min: 1,
      max: 10,
    },
    expiresAt: {
      type: String,
    },
  },
  { collection: "tasks" }
);

const TaskModel = connection.model("Task", TaskSchema);

export default TaskModel;
