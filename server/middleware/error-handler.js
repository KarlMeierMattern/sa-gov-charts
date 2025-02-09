import { CustomError } from "../errors/custom-error.js";

// Covers subclasses of CustomError as well, as long as they extend CustomError.
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err); // For debugging purposes, log the error to the console

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

export { errorHandlerMiddleware };
