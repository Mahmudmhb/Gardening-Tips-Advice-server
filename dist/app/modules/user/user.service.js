"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateSingleUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const handleFollowes = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, targetUserId } = payload;
    // Ensure userId and targetUserId are ObjectId instances
    const userIdObject = new mongoose_1.default.Types.ObjectId(userId);
    const targetUserIdObject = new mongoose_1.default.Types.ObjectId(targetUserId);
    // Check if the user is trying to follow themselves
    if (userIdObject.equals(targetUserIdObject)) {
        throw new Error("You cannot follow yourself");
    }
    // Fetch both users from the database
    const user = yield user_model_1.User.findById(userIdObject);
    const targetUser = yield user_model_1.User.findById(targetUserIdObject);
    if (!user || !targetUser) {
        throw new Error("User not found");
    }
    // Check if already following
    if (user.following.includes(targetUserIdObject)) {
        throw new Error("You are already following this user");
    }
    // Update following and followers arrays
    user.following.push(targetUserIdObject);
    targetUser.followers.push(userIdObject);
    // Save both users
    yield user.save();
    yield targetUser.save();
    return { user, targetUser };
});
const unfollowUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, targetUserId } = payload;
    if (userId.equals(targetUserId)) {
        throw new Error("You cannot unfollow yourself");
    }
    const user = yield user_model_1.User.findById(userId);
    const targetUser = yield user_model_1.User.findById(targetUserId);
    if (!user || !targetUser) {
        throw new Error("User not found");
    }
    // Check if not following
    if (!user.following.includes(targetUserId)) {
        throw new Error("You are not following this user");
    }
    user.following = user.following.filter((id) => !id.equals(targetUserId));
    targetUser.followers = targetUser.followers.filter((id) => !id.equals(userId));
    yield user.save();
    yield targetUser.save();
    return { user, targetUser };
});
exports.UserService = {
    createUserIntoDB,
    getSingleUserFromDB,
    updateSingleUserIntoDB,
    getAllUserFromDB,
    unfollowUser,
    handleFollowes,
};
