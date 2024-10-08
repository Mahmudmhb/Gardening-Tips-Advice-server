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
const updateSinglePostIntoDB = async (id: string, payload: TPost) => {
  const result = await PostModel.findByIdAndUpdate(id, payload, {
    new: true,

    runValidators: true,
  }).populate("user");
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
  if (!commentExists.user === filterUser._id) {
    throw new Error(" you cannt edit this commnet ");
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
  updateCommentInToDb,
};
