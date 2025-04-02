import mongoose, { Schema } from "mongoose"

const QuestionSchema = new Schema({
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
  status: {
    type: String,
    enum: ["pending", "answered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const QuestionModel = mongoose.models.Question || mongoose.model("Question", QuestionSchema)

