import { Types } from "mongoose";

export type TUpvotes = {
  user: Types.ObjectId;
};

export type TPost = {
  text: string;
  image?: string;
  user: Types.ObjectId;
  upvotesCount?: number;
  upvotedUsers?: Types.ObjectId[];
  category: string;
  premium: boolean;
};
