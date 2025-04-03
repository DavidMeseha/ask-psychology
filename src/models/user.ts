import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  emailVerified: boolean;
  verificationToken?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

