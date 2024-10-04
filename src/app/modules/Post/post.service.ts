import { Types } from "mongoose";
import { TPost, TUpvotes } from "./post.interfase";
import { PostModel } from "./post.model";
import { record } from "zod";

const newPost = async (payload: TPost) => {
  const result = (await PostModel.create(payload)).populate("user");
  return result;
};
const getAllPostFromDB = async () => {
  const result = await PostModel.find();
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

  // Save the updated post
  const updatedPost = await post.save();
  return updatedPost;
};
export const PostServices = {
  newPost,
  getAllPostFromDB,
  getSinglePostFromDB,
  updateSinglePostIntoDB,
  upvotePost,
};
