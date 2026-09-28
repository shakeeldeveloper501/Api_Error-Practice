import mongoose from "mongoose";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";

const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";
  let errors = [];

  // ---------------------------------------------
  // Custom ApiError
  // ---------------------------------------------
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors || [];
  }

  // ---------------------------------------------
  // Zod Validation Error
  // ---------------------------------------------
  else if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";

    errors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  // ---------------------------------------------
  // Mongoose Validation Error
  // ---------------------------------------------
  else if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";

    errors = Object.values(error.errors).map((err) => ({
      field: err.path,
      message: err.message,
    }));
  }

  // ---------------------------------------------
  // MongoDB Duplicate Key Error
  // ---------------------------------------------
  else if (error?.code === 11000) {
    statusCode = 409;

    const fields = Object.keys(error.keyPattern || error.keyValue || {});

    message = fields.length
      ? `${fields.join(", ")} already exists`
      : "Duplicate resource";

    errors = fields.map((field) => ({
      field,
      message: `${field} already exists`,
    }));
  }

  // ---------------------------------------------
  // Mongoose Cast Error
  // ---------------------------------------------
  else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${error.path}`;
  }

  // ---------------------------------------------
  // JWT Errors
  // ---------------------------------------------
  else if (error instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = "Token has expired";
  }

  else if (error instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid token";
  }

  // ---------------------------------------------
  // Unknown Error
  // ---------------------------------------------
  else {
    console.error("Unhandled error:", error);
  }

  const response = {
    success: false,
    statusCode,
    message,
    ...(errors.length > 0 && { errors }),
  };

  // Stack only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  
  return res.status(statusCode).json(response);
};

export default errorHandler;