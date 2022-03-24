import mongoose from "mongoose";
import connection from "../utils/mongoose";

const GroupSchema = new mongoose.Schema(
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
  },
  { collection: "groups" }
);

const GroupModel = connection.model("Group", GroupSchema);

export default GroupModel;
