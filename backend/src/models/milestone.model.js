import mongoose from "mongoose";
import connection from "../utils/mongoose";

const MilestoneSchema = new mongoose.Schema(
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
    taskId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
    },
    finished: {
      type: Boolean,
    },
  },
  { collection: "milestones" }
);

const MilestoneModel = connection.model("Milestone", MilestoneSchema);

export default MilestoneModel;
