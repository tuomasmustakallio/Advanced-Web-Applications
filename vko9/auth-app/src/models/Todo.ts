import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  user: string;
  items: string[];
}

const todoSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId },
  items: { type: [String] },
});

export default mongoose.model<ITodo>("Todo", todoSchema);
