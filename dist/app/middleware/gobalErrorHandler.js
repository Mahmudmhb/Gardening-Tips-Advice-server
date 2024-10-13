"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../Error/handleZodError"));
const handleValidationError_1 = __importDefault(require("../Error/handleValidationError"));
const handleCastError_1 = __importDefault(require("../Error/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../Error/handleDuplicateError"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const gobalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err || "something was wrong";
    let errorSource = [
        {
            path: "",
            message: "something was wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError.errorSources;
    }
    else if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError.errorSources;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSource = [{ path: "", message: err === null || err === void 0 ? void 0 : err.message }];
    }
    // Send the response
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
    });
    // Return void
    return; // This is important to avoid TypeScript errors
};
exports.default = gobalErrorHandler;
