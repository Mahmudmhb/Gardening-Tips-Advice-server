import { model, Schema } from "mongoose";
import { TPost } from "./post.interfase";

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String },
});

const PostSchema = new Schema<TPost>(
  {
    text: { type: String, required: true },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotesCount: { type: Number, default: 0 },
    upvotedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    category: { type: String, required: true },
    premium: { type: Boolean, default: false },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

export const PostModel = model<TPost>("post", PostSchema);
