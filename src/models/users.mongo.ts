import { IUser } from "core/types/entities";
import mongoose, { Model, Schema } from "mongoose";

const userSchema: Schema<IUser> = new Schema({
  id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const users: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default users;
