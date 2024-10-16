"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.UserController.getAllUser);
router.get("/:userId", user_controller_1.UserController.getSingleUser);
router.patch("/:userId", user_controller_1.UserController.updateSingleUser);
router.post("/follow", user_controller_1.UserController.followers);
router.post("/unfollow", user_controller_1.UserController.handleUnfollowUser);
router.post("/payment", (0, auth_1.default)(user_constant_1.user_role.user), user_controller_1.UserController.paymentUser);
exports.userRoute = router;
