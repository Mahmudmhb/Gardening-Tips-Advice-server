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
exports.PostControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utilits/catchAsync"));
const sendResponce_1 = __importDefault(require("../../utilits/sendResponce"));
const post_service_1 = require("./post.service");
const newPostIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.newPost(req.body);
    (0, sendResponce_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "post create successfully",
        data: result,
    });
}));
const getAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.getAllPostFromDB();
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All user are retived successfully",
        data: result,
    });
}));
const getMyPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.PostServices.getMyPostFromDB(req.user.email);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All user are retived successfully",
        data: result,
    });
}));
const getSinglePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const result = yield post_service_1.PostServices.getSinglePostFromDB(postId);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All user are retived successfully",
        data: result,
    });
}));
const getCategoryPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params; // Get the category from path parameters
    const result = yield post_service_1.PostServices.getCategoryPostFromDB(category);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `${category} retrieved successfully`,
        data: result,
    });
}));
const updateSinglePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { postId } = req.params;
    if (postId) {
        const result = yield post_service_1.PostServices.updateSinglePostIntoDB(postId, email, req.body);
        (0, sendResponce_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: " post updated successfully",
            data: result,
        });
    }
}));
const deleteSinglePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { postId } = req.params;
    console.log("delete post", email, postId);
    if (postId) {
        const result = yield post_service_1.PostServices.DeleteSinglePostIntoDB(postId, email, req.body);
        (0, sendResponce_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: " deleted successfully",
            data: result,
        });
    }
}));
const UpvotePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const { postId } = req.params;
    const result = yield post_service_1.PostServices.upvotePost(email, postId);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " your Upvote Post successfully",
        data: result,
    });
}));
const commentPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postID } = req.params;
    const { email } = req.user;
    console.log(email, postID, req.body);
    const result = yield post_service_1.PostServices.commentInToDB(postID, email, req.body);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " Thanks for your comment",
        data: result,
    });
}));
const UpdateCommentPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postID } = req.params;
    const { email } = req.user;
    const result = yield post_service_1.PostServices.updateCommentInToDb(postID, email, req.body);
    (0, sendResponce_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "comment updated",
        data: result,
    });
}));
exports.PostControllers = {
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
};
