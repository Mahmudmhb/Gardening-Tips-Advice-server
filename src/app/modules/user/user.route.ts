import { Router } from "express";
import { UserController } from "./user.controller";

import auth from "../../middleware/auth";
import { user_role } from "./user.constant";

const router = Router();
router.get("/", auth(user_role.admin), UserController.getAllUser);
router.get("/:userId", auth(user_role.admin), UserController.getSingleUser);
router.patch(
  "/:userId",

  UserController.updateSingleUser
);
router.post("/follow", UserController.followers);

// Route to unfollow a user
router.post("/unfollow", UserController.handleUnfollowUser);

export const userRoute = router;
