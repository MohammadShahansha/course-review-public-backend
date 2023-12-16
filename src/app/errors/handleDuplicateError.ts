import { TErrorRespons, TErrorSource } from '../interface/errors';

const handleDuplicateError = (err: any): TErrorRespons => {
  const match = err.message.match(/"([^"]*)"/);
  const extracteMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extracteMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleDuplicateError;
