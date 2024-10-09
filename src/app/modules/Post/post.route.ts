import { Router } from "express";
import { PostControllers } from "./post.controller";
import auth from "../../middleware/auth";
import { user_role } from "../user/user.constant";

const router = Router();
router.post("/create", PostControllers.newPostIntoDB);
router.get("/", PostControllers.getAllPost);
router.get("/mypost", auth(user_role.user), PostControllers.getMyPost);
router.get("/:postId", PostControllers.getSinglePost);
router.patch(
  "/update/:postId",
  auth(user_role.user),
  PostControllers.updateSinglePost
);
router.patch(
  "/upvote/:postId",
  auth(user_role.user),
  PostControllers.UpvotePost
);
router.post(
  "/comments/:postID",
  auth(user_role.user),
  PostControllers.commentPost
);
router.patch(
  "/update-commnets/:postID",
  auth(user_role.user),
  PostControllers.UpdateCommentPost
);
router.delete(
  "/delete/:postId",
  auth(user_role.user),
  PostControllers.deleteSinglePost
);
export const PostRoute = router;
