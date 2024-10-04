import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRouter = Router();
AuthRouter.post("/register", AuthController.registerUser);
AuthRouter.post("/login", AuthController.userLogin);

export default AuthRouter;
