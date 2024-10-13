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
exports.PostServices = exports.CreateFavoritePostInToDB = void 0;
const post_model_1 = require("./post.model");
const user_model_1 = require("../user/user.model");
const newPost = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield post_model_1.PostModel.create(payload)).populate("user");
    return result;
});
const getAllPostFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.PostModel.find()
        .populate("user")
        .populate("comments.user")
        .sort({ createdAt: -1, updatedAt: -1, upvotesCount: -1 });
    return result;
});
const getMyPostFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const filterUser = yield user_model_1.User.findOne({ email });
    const findUser = filterUser === null || filterUser === void 0 ? void 0 : filterUser._id;
    const result = yield post_model_1.PostModel.find({
        user: findUser,
    })
        .populate("user")
        .populate("comments.user")
        .sort({ createdAt: -1, updatedAt: -1 });
    return result;
});
const getSinglePostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.PostModel.findById(id)
        .populate("user")
        .populate("comments.user");
    return result;
});
const getCategoryPostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.PostModel.find({ category: id })
        .populate("user")
        .populate("comments.user");
    return result;
});
const updateSinglePostIntoDB = (id, email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("payload", payload);
    const filterPost = yield post_model_1.PostModel.findById(id);
    const filterUser = yield user_model_1.User.findOne({ email });
    if (!filterUser) {
        throw new Error("user not found!");
    }
    if (filterPost && filterUser) {
        if (filterPost.user.toString() !== filterUser._id.toString()) {
            throw new Error("This post is not yours!");
        }
    }
    const result = yield post_model_1.PostModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate("user");
    return result;
});
const DeleteSinglePostIntoDB = (id, email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("payload", payload);
    const filterPost = yield post_model_1.PostModel.findById(id);
    const filterUser = yield user_model_1.User.findOne({ email });
    if (!filterUser) {
        throw new Error("user not found!");
    }
    if (filterPost && filterUser) {
        if (filterPost.user.toString() !== filterUser._id.toString()) {
            throw new Error("This post is not yours!");
        }
    }
    const result = yield post_model_1.PostModel.findByIdAndDelete(id);
    return result;
});
const commentInToDB = (id, email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentText } = payload;
    const filterPost = yield post_model_1.PostModel.findById(id);
    if (!filterPost) {
        throw new Error("Post not found");
    }
    const filterUser = yield user_model_1.User.findOne({ email });
    if (!filterUser) {
        throw new Error("user not found!");
    }
    const result = yield post_model_1.PostModel.findByIdAndUpdate(id, {
        $push: {
            comments: {
                user: filterUser._id,
                comment: commentText,
            },
        },
    }, { new: true })
        .populate("user")
        .populate("comments.user");
    return result;
});
const updateCommentInToDb = (id, email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentText, commentId } = payload;
    const filterPost = yield post_model_1.PostModel.findById(id);
    if (!filterPost) {
        throw new Error("Post not found");
    }
    const filterCommnetWIthPostID = filterPost === null || filterPost === void 0 ? void 0 : filterPost.comments;
    const commentExists = filterCommnetWIthPostID.find((comment) => comment._id.toString() === commentId);
    if (!commentExists) {
        throw new Error("Comment not found");
    }
    const filterUser = yield user_model_1.User.findOne({ email });
    if (!filterUser) {
        throw new Error("user not found!");
    }
    if (!commentExists.user.equals(filterUser._id)) {
        throw new Error("is not your comment");
    }
    const result = yield post_model_1.PostModel.findOneAndUpdate({ _id: id, "comments._id": commentId }, {
        $set: {
            "comments.$.comment": commentText,
        },
    }, { new: true });
    return result;
});
const upvotePost = (email, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.PostModel.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    console.log("user id", post.user);
    const postUser = post.user;
    const filterUser = yield user_model_1.User.findOne({ email });
    if (!filterUser) {
        throw new Error("User not found");
    }
    const user = filterUser._id;
    if (post.user.equals(user)) {
        throw new Error("You cannot upvote your own post");
    }
    const hasUpvoted = post.upvotedUsers.includes(user);
    if (hasUpvoted) {
        post.upvotedUsers = post.upvotedUsers.filter((userId) => !userId.equals(user));
        post.upvotesCount = (post.upvotesCount || 1) - 1;
    }
    else {
        post.upvotedUsers.push(user);
        post.upvotesCount = (post.upvotesCount || 0) + 1;
        if (post.upvotesCount >= 1) {
            yield user_model_1.User.updateOne({ _id: postUser }, { premium: true });
        }
    }
    const updatedPost = yield post.save();
    yield updatedPost.populate("user");
    return updatedPost;
});
const CreateFavoritePostInToDB = (postId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new Error("User not found!");
    }
    // Check if the post exists
    const postExists = yield post_model_1.PostModel.findById(postId);
    if (!postExists) {
        throw new Error("Post not found!");
    }
    // Add the postId to the user's favorites if it's not already added
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(user._id, {
        $addToSet: { favorite: postId }, // $addToSet ensures no duplicates
    }, {
        new: true,
        runValidators: true,
    }).populate("favorite"); // Populate the favorite field with the post details
    return updatedUser;
});
exports.CreateFavoritePostInToDB = CreateFavoritePostInToDB;
exports.PostServices = {
    newPost,
    getAllPostFromDB,
    getSinglePostFromDB,
    updateSinglePostIntoDB,
    upvotePost,
    getMyPostFromDB,
    commentInToDB,
    updateCommentInToDb,
    DeleteSinglePostIntoDB,
    getCategoryPostFromDB,
    CreateFavoritePostInToDB: exports.CreateFavoritePostInToDB,
};
