import { Types } from "mongoose";

export type TUpvotes = {
  user: Types.ObjectId; // User who upvoted
};

export type TPost = {
  text: string;
  image?: string;
  user: Types.ObjectId; // Author of the post
  upvotesCount?: number; // Count of upvotes
  upvotedUsers?: Types.ObjectId[]; // Users who have upvoted
};
