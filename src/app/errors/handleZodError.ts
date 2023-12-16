import { ZodError, ZodIssue } from 'zod';
import { TErrorRespons, TErrorSource } from '../interface/errors';

const handleZodError = (err: ZodError): TErrorRespons => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};
export default handleZodError;
