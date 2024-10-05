import { model, Schema } from "mongoose";
import { TPost } from "./post.interfase";

const UpvoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
  upvotes: { type: Number, default: 0 }, // Default to 0
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const PostModel = model<TPost>("post", PostSchema);
