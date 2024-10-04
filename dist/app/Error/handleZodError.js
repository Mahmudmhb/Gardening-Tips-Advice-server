"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    //   console.log("handele error finding", err.issues);
    const errorSources = err.issues.map((issue) => {
        // console.log("issue check", issue);
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: " Zod validation error",
        errorSources,
    };
};
exports.default = handleZodError;
