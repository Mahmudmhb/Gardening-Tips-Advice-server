import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGeneticErrorResponse } from "../interfase/error";

const handleZodError = (err: ZodError): TGeneticErrorResponse => {
  //   console.log("handele error finding", err.issues);
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    // console.log("issue check", issue);
    return {
      path: issue?.path[issue.path.length - 1],
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
export default handleZodError;
