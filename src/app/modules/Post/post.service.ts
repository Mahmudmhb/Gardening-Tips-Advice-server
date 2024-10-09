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
  console.log("find comment", commentExists?.user);
  if (!commentExists) {
    throw new Error("Comment not found");
  }
  const filterUser = await User.findOne({ email });
  if (!filterUser) {
    throw new Error("user not found!");
  }
  console.log("find user", filterUser._id);
  if (!commentExists.user.equals(filterUser._id as string)) {
    throw new Error("You cannot edit this comment");
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

const upvotePost = async (email: string, payload: { postId: string }) => {
  const { postId } = payload;

  // Find the post by ID
  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Find the user by email
  const filterUser = await User.findOne({ email });
  if (!filterUser) {
    throw new Error("User not found");
  }

  const user = filterUser._id as Types.ObjectId;

  // Prevent user from upvoting their own post
  if (post.user.equals(user)) {
    throw new Error("You cannot upvote your own post");
  }

  // Prevent user from upvoting the same post multiple times
  if (post.upvotedUsers!.includes(user)) {
    throw new Error("User has already upvoted this post");
  }

  // Increment the upvotes count
  post.upvotesCount = (post.upvotesCount || 0) + 1;

  // Add the user to the list of upvoted users
  post.upvotedUsers!.push(user);

  // If upvotesCount is greater than 1, update user to premium
  if (post.upvotesCount > 1) {
    const result = await User.updateOne(
      { _id: user }, // Corrected from `userId`
      {
        premium: true,
      }
    );
    console.log("User premium status updated", result);
  }

  // Save the updated post
  const updatedPost = await post.save();
  await updatedPost.populate("user"); // Populate the user field

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
};
