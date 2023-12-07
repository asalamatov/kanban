import { Schema, models, model } from "mongoose";

const boardSchema = new Schema({
  name: {
    type: String,
    required: [true, "Board name is required"],
    unique: [true, "Board name already exists"],
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      unique: [true, "User already exists"],
    },
  ],
});

const Board = models.Board || model("Board", boardSchema);

export default Board;