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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const config_1 = __importDefault(require("../../config"));
const auth_utls_1 = require("./auth.utls");
const user_model_1 = require("../user/user.model");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User allready exists");
    }
    const newUser = yield user_model_1.User.create(payload);
    return newUser;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByCustomId(payload.email);
    // const isUserExists = await User.findOne({ email: payload.email }).select(
    //   "password"
    // );
    // console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_EXTENDED, "This User not found");
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload.password, user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "wrong password !");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utls_1.accesstoken)(jwtPayload, config_1.default.jwt_access_token, "7d");
    const token = `${accessToken}`;
    const accessRefreashToken = (0, auth_utls_1.accesstoken)(jwtPayload, config_1.default.jwt_refresh_token, "1y");
    return {
        token,
        accessRefreashToken,
        user,
    };
});
const udapteUserIntoDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.AuthService = {
    register,
    udapteUserIntoDb,
    loginUser,
};
