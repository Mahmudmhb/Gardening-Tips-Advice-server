import { Schema, Types } from "mongoose";
import { TPost } from "./post.interfase";
import { PostModel } from "./post.model";
import { User } from "../user/user.model";
import { error } from "console";
export type IProps = {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
};
const newPost = async (payload: TPost) => {
  const result = (await PostModel.create(payload)).populate("user");
  return result;
};
const getAllPostFromDB = async () => {
  const result = await PostModel.find()
    .populate("user")
    .sort({ createdAt: -1, updatedAt: -1 });
  return result;
};
const getMyPostFromDB = async (email: string) => {
  const filterUser = await User.findOne({ email });
  const findUser = filterUser?._id;
  const result = await PostModel.find({
    user: findUser,
  })
    .populate("user")
    .sort({ createdAt: -1, updatedAt: -1 });
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

const commentInToDB = async (
  id: string,
  payload: Record<string, undefined>
) => {
  const { userId, commentText } = payload;
  const filterPost = await PostModel.findById(id);
  if (!filterPost) {
    throw new Error("Post not found");
  }
  const filterUser = await User.findOne({ _id: userId });
  if (!filterUser) {
    throw new Error("user not found!");
  }
  const result = await PostModel.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: {
          user: userId,
          comment: commentText,
        },
      },
    },
    { new: true }
  );
  console.log(result);
  return result;
};
const upvotePost = async (payload: Record<string, undefined>) => {
  const { postId, userId } = payload;
  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user.equals(userId)) {
    throw new Error("You cannot upvote your own post");
  }

  if (post.upvotedUsers!.includes(userId!)) {
    throw new Error("User has already upvoted this post");
  }
  post.upvotesCount! += 1;
  post.upvotedUsers!.push(userId!);
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
  getMyPostFromDB,
  commentInToDB,
};
