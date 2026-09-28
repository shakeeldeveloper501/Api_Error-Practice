
// Simple class
class ApiError extends Error {
  constructor(statusCode, message, error) {
    super(message)
    this.statusCode = statusCode;
    this.error = error;
  }
}

// Class with default properties
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", error = []) {
    super(message)
    this.statusCode = statusCode;
    this.error = error;
  }
}

// Class with adding status & error name
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", error = []) {
    super(message)
    this.success = false;
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.error = error;
  }
}

// 1. Simple function
const asyncHandler = () => { }

// 2. Function with parameter
const asyncHandler = (func) => { }

// 3. Parameter + return a function
const asyncHandler = (func) => {
  return () => { }
}

// 4. Return express middleware function
const asyncHandler = (func) => {
  return (req, res, next) => { }
}

// 5. Returned handler function receives express arguments
const asyncHandler = (handler) => {
  return (req, res, next) => { handler(req, res, next) }
}

// 6. Express middleware with promise/error
const asyncHandler = (handler) => {
  return (req, res, next) => {
    Promise
      .resolve(handler(req, res, next))
      .catch(next);
  };
};

// 7. Express middlware with try/catch 
const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    }
    catch (error) {
      next(error)
    }
  };
};


const errorHandler = () => {};

const errorHandler = () => {};

const errorHandler = (error, req, res, next) => {};

const errorHandler = (error, req, res, next) => {};

const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
};

const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";
};

if (error instanceof ApiError) {
  statusCode = error.statusCode;
  message = error.message;
  errors = error.errors || [];
}

const response = {
  success: false,
  statusCode,
  message,
};

const response = {
  success: false,
  statusCode,
  message,
  ...(errors.length > 0 && { errors }),
};

const response = {
  success: false,
  statusCode,
  message,
  ...(errors.length > 0 && { errors }),
};