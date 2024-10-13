import mongoose from "mongoose";
import { IUser } from "./user.interfase";
import { User } from "./user.model";
import { initialPayment } from "../Payment/payment.utlis";

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateSingleUserIntoDB = async (id: string, payload: IUser) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const handleFollowes = async (payload: any) => {
  const { userId, targetUserId } = payload;

  // Ensure userId and targetUserId are ObjectId instances
  const userIdObject = new mongoose.Types.ObjectId(userId);
  const targetUserIdObject = new mongoose.Types.ObjectId(targetUserId);

  // Check if the user is trying to follow themselves
  if (userIdObject.equals(targetUserIdObject)) {
    throw new Error("You cannot follow yourself");
  }

  // Fetch both users from the database
  const user = await User.findById(userIdObject);
  const targetUser = await User.findById(targetUserIdObject);

  if (!user || !targetUser) {
    throw new Error("User not found");
  }

  // Check if already following
  if (user.following!.includes(targetUserIdObject)) {
    throw new Error("You are already following this user");
  }

  // Update following and followers arrays
  user.following!.push(targetUserIdObject);
  targetUser.followers!.push(userIdObject);

  // Save both users
  await user.save();
  await targetUser.save();

  return { user, targetUser };
};
const unfollowUser = async (payload: any) => {
  const { userId, targetUserId } = payload;
  if (userId.equals(targetUserId)) {
    throw new Error("You cannot unfollow yourself");
  }

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!user || !targetUser) {
    throw new Error("User not found");
  }

  // Check if not following
  if (!user.following!.includes(targetUserId)) {
    throw new Error("You are not following this user");
  }

  user.following = user.following!.filter((id) => !id.equals(targetUserId));
  targetUser.followers = targetUser.followers!.filter(
    (id) => !id.equals(userId)
  );

  await user.save();
  await targetUser.save();

  return { user, targetUser };
};
const viarifyPayment = async (email: string, payload: any) => {
  const getPayment = payload;
  const filterUser = await User.findOne({ email });
  console.log(getPayment, "payment");
  const totalCost = getPayment.amaount;

  const transactionId = `TXN-${Date.now()}`;

  const order = await User.updateOne(
    { _id: filterUser!._id },
    {
      paymentStatus: "Pending",

      verified: true,

      transactionId,
    },
    { new: true }
  );
  console.log("order", order);
  const paymentData = {
    transactionId,
    totalCost,
    customerName: filterUser?.username,
    custormarEmail: filterUser?.email,
    custormarPhone: filterUser?.phone,
  };
  const initialState = await initialPayment(paymentData);
  console.log("service pages", initialState);
  return initialState;
};
export const UserService = {
  createUserIntoDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  getAllUserFromDB,
  unfollowUser,
  handleFollowes,
  viarifyPayment,
};
