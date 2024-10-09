import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { UserService } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);
  sendResponce(res, {
    statusCode: 201,
    success: true,
    message: "User Create successfully",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromDB();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user are retived successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserService.getSingleUserFromDB(userId);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All user are retived successfully",
    data: result,
  });
});
const updateSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const result = await UserService.updateSingleUserIntoDB(userId, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " user role updated successfully",
    data: result,
  });
});
const followers = catchAsync(async (req, res) => {
  console.log("hiting the button", req.body);
  const result = await UserService.handleFollowes(req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " user role updated successfully",
    data: result,
  });
});
const handleUnfollowUser = catchAsync(async (req, res) => {
  console.log("hiting the button", req.body);
  const result = await UserService.unfollowUser(req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " user role updated successfully",
    data: result,
  });
});
const paymentUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  const userData = req.body;
  const result = await UserService.viarifyPayment(email, userData);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " varify successfully",
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  handleUnfollowUser,
  followers,
  paymentUser,
};
