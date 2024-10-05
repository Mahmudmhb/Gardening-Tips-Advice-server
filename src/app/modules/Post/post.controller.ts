import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { PostServices } from "./post.service";

const newPostIntoDB = catchAsync(async (req, res) => {
  console.log(req.body);
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
  console.log("hiting the button", req.body);
  const result = await PostServices.upvotePost(req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " user role updated successfully",
    data: result,
  });
});

export const PostControllers = {
  newPostIntoDB,
  updateSinglePost,
  getAllPost,
  getSinglePost,
  UpvotePost,
};
