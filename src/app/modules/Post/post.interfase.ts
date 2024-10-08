import { Types } from "mongoose";

export type TUpvotes = {
  user: Types.ObjectId;
};
export type TCommnets = {
  _id?: any;
  user: Types.ObjectId;
  comment: string;
};
export type TPost = {
  text: string;
  image?: string;
  user: Types.ObjectId;
  upvotesCount?: number;
  upvotedUsers?: Types.ObjectId[];
  category: string;
  premium?: boolean;
  comments?: TCommnets[];
};
