import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorDetails: any = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof Error) {
    message = err.message;
    errorDetails = err;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
