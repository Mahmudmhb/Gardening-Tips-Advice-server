import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../Error/handleZodError";
import config from "../config";
import handleValidationError from "../Error/handleValidationError";
import handleCastError from "../Error/handleCastError";
import handleDuplicateError from "../Error/handleDuplicateError";
import AppError from "../Error/AppError";
import { TErrorSources } from "../interfase/error";

const gobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err || "something was wrong";

  let errorSource: TErrorSources = [
    {
      path: "",
      message: "something was wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplefeidError = handleZodError(err);
    message = simplefeidError?.message;
    statusCode = simplefeidError?.statusCode;
    errorSource = simplefeidError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplefeidError = handleValidationError(err);
    statusCode = simplefeidError.statusCode;
    message = simplefeidError?.message;
    errorSource = simplefeidError.errorSources;
  } else if (err.name === "CastError") {
    const simplefeidError = handleCastError(err);
    statusCode = simplefeidError.statusCode;
    message = simplefeidError?.message;
    errorSource = simplefeidError.errorSources;
  } else if (err.code === 11000) {
    const simplefeidError = handleDuplicateError(err);
    statusCode = simplefeidError.statusCode;
    message = simplefeidError?.message;
    errorSource = simplefeidError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    // err,

    // stack: config.NODE_ENV === "development" ? err.stack : null,
  });
};
export default gobalErrorHandler;
