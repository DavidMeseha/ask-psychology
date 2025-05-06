import { ReplyType } from "@/types";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuestion extends Document {
  userId: Types.ObjectId;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  createdAt: Date;
  replyType: ReplyType;
  verificationToken?: string;
}

const QuestionSchema = new Schema<IQuestion>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  replyType: {
    type: String,
    enum: ["no-reply", "private", "public"],
    default: "no-reply",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const QuestionModel =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);
