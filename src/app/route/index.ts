import { Router } from "express";
import AuthRouter from "../modules/Auth/auth.route";
import { userRoute } from "../modules/user/user.route";
import { PostRoute } from "../modules/Post/post.route";

const router = Router();
const moduleRoute = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/post",
    route: PostRoute,
  },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
