import { Router } from "express";
import { UserController } from "./user.controller";

import auth from "../../middleware/auth";
import { user_role } from "./user.constant";

const router = Router();
router.get("/", UserController.getAllUser);
router.get("/:userId", UserController.getSingleUser);
router.patch(
  "/:userId",

  UserController.updateSingleUser
);
router.post("/follow", UserController.followers);

router.post("/unfollow", UserController.handleUnfollowUser);
router.post("/payment", auth(user_role.user), UserController.paymentUser);

export const userRoute = router;
