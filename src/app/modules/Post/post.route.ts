import { Router } from "express";
import { PostControllers } from "./post.controller";
import auth from "../../middleware/auth";
import { user_role } from "../user/user.constant";

const router = Router();
router.post("/create", PostControllers.newPostIntoDB);
router.get("/", PostControllers.getAllPost);
router.get("/mypost", auth(user_role.user), PostControllers.getMyPost);
router.get("/:postId", PostControllers.getSinglePost);
router.patch("/update/:postId", PostControllers.updateSinglePost);
router.patch("/upvote", PostControllers.UpvotePost);
router.patch("/commnets/:postID", PostControllers.commentPost);
export const PostRoute = router;
