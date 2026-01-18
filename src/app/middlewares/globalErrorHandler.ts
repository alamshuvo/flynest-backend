/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import AuthError from '../error/AuthError';
import AppError from '../error/AppError';
import NotFoundError from '../error/NotFoundError';
import handleDuplicateError from '../error/DuplicateError';
import handleNotFoundError from '../error/handleNotFoundError';
import handleAuthError from '../error/handleAuthError';
import handleAppError from '../error/handleAppError';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message = err.message || 'Something went wrong';

  const errorSources: TErrorSources = [
    {
      path: '',
      message: message,
    },
  ];
  let simplifiedError = {
    status: 500,
    message,
    error: errorSources,
  };
   if (err?.code === 11000) {
    simplifiedError = handleDuplicateError(err);
  } else if (err instanceof AppError) {
    simplifiedError = handleAppError(err);
  } else if (err instanceof AuthError) {
    simplifiedError = handleAuthError(err);
  } else if (err instanceof NotFoundError) {
    simplifiedError = handleNotFoundError(err);
  } else {
    simplifiedError = {
      ...simplifiedError,
      message: err?.message,
    };
  }
  res.status(simplifiedError.status).json({
    success: false,
    ...simplifiedError,
  });
};

export default globalErrorHandler;