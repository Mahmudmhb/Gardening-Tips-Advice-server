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
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSource = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError.errorSources;
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError.errorSources;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [{ path: "", message: err?.message }];
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

export default gobalErrorHandler;
