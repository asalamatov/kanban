import { Schema, models, model } from "mongoose";

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
});

const Task = models.Task || model("Task", taskSchema);

export default Task;