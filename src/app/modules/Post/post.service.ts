import { Schema, Types } from "mongoose";
import { TPost } from "./post.interfase";
import { PostModel } from "./post.model";
import { User } from "../user/user.model";
export type IProps = {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
};
const newPost = async (payload: TPost) => {
  console.log(payload);
  const result = (await PostModel.create(payload)).populate("user");
  return result;
};
const getAllPostFromDB = async () => {
  const result = await PostModel.find().populate("user");
  return result;
};
const getSinglePostFromDB = async (id: string) => {
  const result = await PostModel.findById(id);
  return result;
};
const updateSinglePostIntoDB = async (id: string, payload: TPost) => {
  const result = await PostModel.findByIdAndUpdate(id, payload, {
    new: true,

    runValidators: true,
  });
  return result;
};
const upvotePost = async (payload: TPost) => {
  const { postId, userId } = payload;
  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user trying to upvote is the author of the post
  if (post.user.equals(userId)) {
    throw new Error("You cannot upvote your own post");
  }

  // Check if the user has already upvoted the post
  if (post.upvotedUsers!.includes(userId)) {
    throw new Error("User has already upvoted this post");
  }

  // Update the upvote count and add the user to the upvotedUsers list
  post.upvotesCount! += 1;

  post.upvotedUsers!.push(userId);
  if (post.upvotesCount! > 1) {
    const result = await User.updateOne(
      { _id: userId },
      {
        premium: true,
      }
    );
    console.log("upvote", result);
  }
  // Save the updated post
  const updatedPost = (await post.save()).populate("user");
  return updatedPost;
};
export const PostServices = {
  newPost,
  getAllPostFromDB,
  getSinglePostFromDB,
  updateSinglePostIntoDB,
  upvotePost,
};
