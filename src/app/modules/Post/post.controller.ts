import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { PostServices } from "./post.service";

const newPostIntoDB = catchAsync(async (req, res) => {
  const result = await PostServices.newPost(req.body);
  sendResponce(res, {
    statusCode: 201,
    success: true,
    message: "post create successfully",
    data: result,
  });
});
const getAllPost = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostFromDB();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user are retived successfully",
    data: result,
  });
});
const getMyPost = catchAsync(async (req, res) => {
  const result = await PostServices.getMyPostFromDB(req.user.email);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user are retived successfully",
    data: result,
  });
});
const getSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.getSinglePostFromDB(postId);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user are retived successfully",
    data: result,
  });
});
const getCategoryPost = catchAsync(async (req, res) => {
  const { category } = req.params; // Get the category from path parameters
  const result = await PostServices.getCategoryPostFromDB(category);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${category} retrieved successfully`,
    data: result,
  });
});

const updateSinglePost = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { postId } = req.params;
  if (postId) {
    const result = await PostServices.updateSinglePostIntoDB(
      postId,
      email,
      req.body
    );
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " post updated successfully",
      data: result,
    });
  }
});
const deleteSinglePost = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { postId } = req.params;
  console.log("delete post", email, postId);
  if (postId) {
    const result = await PostServices.DeleteSinglePostIntoDB(
      postId,
      email,
      req.body
    );
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " deleted successfully",
      data: result,
    });
  }
});
const UpvotePost = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { postId } = req.params;
  const result = await PostServices.upvotePost(email, postId);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " your Upvote Post successfully",
    data: result,
  });
});
const commentPost = catchAsync(async (req, res) => {
  const { postID } = req.params;
  const { email } = req.user;
  console.log(email, postID, req.body);
  const result = await PostServices.commentInToDB(postID, email, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Thanks for your comment",
    data: result,
  });
});
const UpdateCommentPost = catchAsync(async (req, res) => {
  const { postID } = req.params;
  const { email } = req.user;

  const result = await PostServices.updateCommentInToDb(
    postID,
    email,
    req.body
  );
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "comment updated",
    data: result,
  });
});
const CreateFavoritePost = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { postId } = req.params;
  if (postId) {
    const result = await PostServices.CreateFavoritePostInToDB(postId, email);
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " your Favorite post updated successfully",
      data: result,
    });
  }
});
export const PostControllers = {
  newPostIntoDB,
  updateSinglePost,
  getAllPost,
  getSinglePost,
  UpvotePost,
  getMyPost,
  commentPost,
  UpdateCommentPost,
  deleteSinglePost,
  getCategoryPost,
  CreateFavoritePost,
};
