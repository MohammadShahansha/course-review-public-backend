import mongoose from 'mongoose';
import { TErrorRespons, TErrorSource } from '../interface/errors';

const handleCastError = (err: mongoose.Error.CastError): TErrorRespons => {
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default handleCastError;
