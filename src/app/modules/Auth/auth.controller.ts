import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { AuthService } from "./auth.service";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);
  sendResponce(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const userLogin = catchAsync(async (req, res) => {
  const { accessRefreashToken, token, user } = await AuthService.loginUser(
    req.body
  );

  res.cookie("refreshToken", accessRefreashToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: { user, token },
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AuthService.udapteUserIntoDb(req.body, userId);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  userLogin,
  updateUser,
};
