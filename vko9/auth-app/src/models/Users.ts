import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const usersSchema: Schema = new Schema({
  email: { type: String },
  password: { type: String },
});
export default mongoose.model<IUser>("Users", usersSchema);
