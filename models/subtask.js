import { Schema, models, model } from "mongoose";

const subtaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
});

const Subtask = models.Subtask || model("Subtask", subtaskSchema);

export default Subtask;