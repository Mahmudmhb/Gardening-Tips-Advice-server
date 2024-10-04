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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const post_model_1 = require("./post.model");
const newPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield post_model_1.PostModel.create(payload)).populate("user");
    return result;
});
const getAllPostFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.PostModel.find();
    return result;
});
const getSinglePostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.PostModel.findById(id);
    return result;
});
const updateSinglePostIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.PostModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const upvotePost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = payload;
    const post = yield post_model_1.PostModel.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    // Check if the user trying to upvote is the author of the post
    if (post.user.equals(userId)) {
        throw new Error("You cannot upvote your own post");
    }
    // Check if the user has already upvoted the post
    if (post.upvotedUsers.includes(userId)) {
        throw new Error("User has already upvoted this post");
    }
    // Update the upvote count and add the user to the upvotedUsers list
    post.upvotesCount += 1;
    post.upvotedUsers.push(userId);
    // Save the updated post
    const updatedPost = yield post.save();
    return updatedPost;
});
exports.PostServices = {
    newPost,
    getAllPostFromDB,
    getSinglePostFromDB,
    updateSinglePostIntoDB,
    upvotePost,
};
