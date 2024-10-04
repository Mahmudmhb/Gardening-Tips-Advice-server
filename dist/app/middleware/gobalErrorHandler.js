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
        const simplefeidError = (0, handleZodError_1.default)(err);
        message = simplefeidError === null || simplefeidError === void 0 ? void 0 : simplefeidError.message;
        statusCode = simplefeidError === null || simplefeidError === void 0 ? void 0 : simplefeidError.statusCode;
        errorSource = simplefeidError === null || simplefeidError === void 0 ? void 0 : simplefeidError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplefeidError = (0, handleValidationError_1.default)(err);
        statusCode = simplefeidError.statusCode;
        message = simplefeidError === null || simplefeidError === void 0 ? void 0 : simplefeidError.message;
        errorSource = simplefeidError.errorSources;
    }
    else if (err.name === "CastError") {
        const simplefeidError = (0, handleCastError_1.default)(err);
        statusCode = simplefeidError.statusCode;
        message = simplefeidError === null || simplefeidError === void 0 ? void 0 : simplefeidError.message;
        errorSource = simplefeidError.errorSources;
    }
    else if (err.code === 11000) {
        const simplefeidError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplefeidError.statusCode;
        message = simplefeidError === null || simplefeidError === void 0 ? void 0 : simplefeidError.message;
        errorSource = simplefeidError.errorSources;
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
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        // err,
        // stack: config.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.default = gobalErrorHandler;
