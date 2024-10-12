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
    .populate("comments.user")
    .sort({ createdAt: -1, updatedAt: -1, upvotesCount: -1 });
  return result;
};
const getMyPostFromDB = async (email: string) => {
  const filterUser = await User.findOne({ email });
  const findUser = filterUser?._id;
  const result = await PostModel.find({
    user: findUser,
  })
    .populate("user")
    .populate("comments.user")
    .sort({ createdAt: -1, updatedAt: -1 });
  return result;
};
const getSinglePostFromDB = async (id: string) => {
  const result = await PostModel.findById(id)
    .populate("user")
    .populate("comments.user");
  return result;
};
const getCategoryPostFromDB = async (id: unknown) => {
  const result = await PostModel.find({ category: id })
    .populate("user")
    .populate("comments.user");
  return result;
};
const updateSinglePostIntoDB = async (
  id: string,
  email: string,
  payload: TPost
) => {
  console.log("payload", payload);
  const filterPost = await PostModel.findById(id);
  const filterUser = await User.findOne({ email });
  if (!filterUser) {
    throw new Error("user not found!");
  }
  if (filterPost && filterUser) {
    if (filterPost.user.toString() !== filterUser._id!.toString()) {
      throw new Error("This post is not yours!");
    }
  }
  const result = await PostModel.findByIdAndUpdate(id, payload, {
    new: true,

    runValidators: true,
  }).populate("user");
  return result;
};
const DeleteSinglePostIntoDB = async (
  id: string,
  email: string,
  payload: TPost
) => {
  console.log("payload", payload);
  const filterPost = await PostModel.findById(id);
  const filterUser = await User.findOne({ email });
  if (!filterUser) {
    throw new Error("user not found!");
  }
  if (filterPost && filterUser) {
    if (filterPost.user.toString() !== filterUser._id!.toString()) {
      throw new Error("This post is not yours!");
    }
  }
  const result = await PostModel.findByIdAndDelete(id);
  return result;
};

const commentInToDB = async (
  id: string,
  email: string,
  payload: Record<string, undefined>
) => {
  const { commentText } = payload;
  const filterPost = await PostModel.findById(id);
  if (!filterPost) {
    throw new Error("Post not found");
  }
  const filterUser = await User.findOne({ email });
  if (!filterUser) {
    throw new Error("user not found!");
  }
  const result = await PostModel.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: {
          user: filterUser._id,
          comment: commentText,
        },
      },
    },
    { new: true }
  )
    .populate("user")
    .populate("comments.user");
  return result;
};
const updateCommentInToDb = async (
  id: string,
  email: string,

  payload: Record<string, undefined>
) => {
  const { commentText, commentId } = payload;
  const filterPost = await PostModel.findById(id);
  if (!filterPost) {
    throw new Error("Post not found");
  }
  const filterCommnetWIthPostID = filterPost?.comments;

  const commentExists = filterCommnetWIthPostID!.find(
    (comment) => comment._id.toString() === commentId
  );
  if (!commentExists) {
    throw new Error("Comment not found");
  }
  const filterUser = await User.findOne({ email });
  if (!filterUser) {
    throw new Error("user not found!");
  }
  if (!commentExists.user.equals(filterUser._id as string)) {
    throw new Error("is not your comment");
  }
  const result = await PostModel.findOneAndUpdate(
    { _id: id, "comments._id": commentId },
    {
      $set: {
        "comments.$.comment": commentText,
      },
    },
    { new: true }
  );
  return result;
};

const upvotePost = async (email: string, postId: string) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  console.log("user id", post.user);
  const postUser = post.user;
  const filterUser = await User.findOne({ email });
  if (!filterUser) {
    throw new Error("User not found");
  }
  const user = filterUser._id as Types.ObjectId;
  if (post.user.equals(user)) {
    throw new Error("You cannot upvote your own post");
  }
  const hasUpvoted = post.upvotedUsers!.includes(user);

  if (hasUpvoted) {
    post.upvotedUsers = post.upvotedUsers!.filter(
      (userId) => !userId.equals(user)
    );
    post.upvotesCount = (post.upvotesCount || 1) - 1;
  } else {
    post.upvotedUsers!.push(user);
    post.upvotesCount = (post.upvotesCount || 0) + 1;

    if (post.upvotesCount >= 1) {
      await User.updateOne({ _id: postUser }, { premium: true });
    }
  }

  // Save the updated post
  const updatedPost = await post.save();
  await updatedPost.populate("user");

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
  updateCommentInToDb,
  DeleteSinglePostIntoDB,
  getCategoryPostFromDB,
};
