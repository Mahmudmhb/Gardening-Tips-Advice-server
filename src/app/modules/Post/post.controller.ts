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
const updateSinglePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  if (postId) {
    const result = await PostServices.updateSinglePostIntoDB(postId, req.body);
    sendResponce(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: " post updated successfully",
      data: result,
    });
  }
});
const UpvotePost = catchAsync(async (req, res) => {
  const result = await PostServices.upvotePost(req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " youre Upvote Post successfully",
    data: result,
  });
});
const commentPost = catchAsync(async (req, res) => {
  const { postID } = req.params;
  console.log("hiting the button", req.body);
  const result = await PostServices.commentInToDB(postID, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Thanks for your comment",
    data: result,
  });
});

export const PostControllers = {
  newPostIntoDB,
  updateSinglePost,
  getAllPost,
  getSinglePost,
  UpvotePost,
  getMyPost,
  commentPost,
};
