import { Schema, models, model } from "mongoose";

const columnSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
});

const Column = models.Column || model("Column", columnSchema);

export default Column;