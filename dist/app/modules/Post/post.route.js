"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/create", post_controller_1.PostControllers.newPostIntoDB);
router.get("/", post_controller_1.PostControllers.getAllPost);
router.get("/mypost", (0, auth_1.default)(user_constant_1.user_role.user), post_controller_1.PostControllers.getMyPost);
router.get("/:postId", post_controller_1.PostControllers.getSinglePost);
router.get("/category/:category", post_controller_1.PostControllers.getCategoryPost);
router.patch("/update/:postId", (0, auth_1.default)(user_constant_1.user_role.user), post_controller_1.PostControllers.updateSinglePost);
router.patch("/upvote/:postId", (0, auth_1.default)(user_constant_1.user_role.user), post_controller_1.PostControllers.UpvotePost);
router.post("/comments/:postID", (0, auth_1.default)(user_constant_1.user_role.user), post_controller_1.PostControllers.commentPost);
router.patch("/update-commnets/:postID", (0, auth_1.default)(user_constant_1.user_role.user), post_controller_1.PostControllers.UpdateCommentPost);
router.delete("/delete/:postId", (0, auth_1.default)(user_constant_1.user_role.user || user_constant_1.user_role.admin), post_controller_1.PostControllers.deleteSinglePost);
router.patch("/favorite/:postId", (0, auth_1.default)(user_constant_1.user_role.user), post_controller_1.PostControllers.CreateFavoritePost);
exports.PostRoute = router;
