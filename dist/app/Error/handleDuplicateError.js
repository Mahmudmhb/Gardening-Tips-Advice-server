"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${extractMessage} already exsits`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid  ID",
        errorSources,
    };
};
exports.default = handleDuplicateError;
