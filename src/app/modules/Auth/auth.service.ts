import httpStatus from "http-status";
import { IUser } from "../user/user.interfase";
import AppError from "../../Error/AppError";
import config from "../../config";
import { accesstoken } from "./auth.utls";
import { TUserLogin } from "./auth.interfase";
import { User } from "../user/user.model";

const register = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User allready exists");
  }
  const newUser = await User.create(payload);
  return newUser;
};
const loginUser = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByCustomId(payload.email);

  // const isUserExists = await User.findOne({ email: payload.email }).select(
  //   "password"
  // );
  // console.log(user);
  if (!user) {
    throw new AppError(httpStatus.NOT_EXTENDED, "This User not found");
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "wrong password !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = accesstoken(
    jwtPayload,
    config.jwt_access_token as string,
    "7d"
  );
  const token = `${accessToken}`;

  const accessRefreashToken = accesstoken(
    jwtPayload,
    config.jwt_refresh_token as string,
    "1y"
  );
  return {
    token,
    accessRefreashToken,
    user,
  };
};

const udapteUserIntoDb = async (
  payload: Record<string, unknown>,
  id: string
) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const AuthService = {
  register,
  udapteUserIntoDb,
  loginUser,
};
