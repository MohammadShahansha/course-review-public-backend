import mongoose from 'mongoose';
// import { TErrorRespons, TErrorSource } from '../interface/errors';

const handleCastError = (err: mongoose.Error.CastError) => {
  //   const errorDetails = [
  //     {
  //       path: err.path,
  //       message: err.message,
  //     },
  //   ];
  const errorMessage = `${err.value} is not a valid ID! `;
  const errorDetails = err;

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    errorDetails,
  };
};

export default handleCastError;
