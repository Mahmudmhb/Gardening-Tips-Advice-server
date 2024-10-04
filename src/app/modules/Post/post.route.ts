import { Router } from "express";
import { PostControllers } from "./post.controller";

const router = Router();
router.post("/create", PostControllers.newPostIntoDB);
router.get("/", PostControllers.getAllPost);
router.get("/:postId", PostControllers.getSinglePost);
router.patch("/update/:postId", PostControllers.updateSinglePost);
router.patch("/upvote", PostControllers.UpvotePost);
export const PostRoute = router;
