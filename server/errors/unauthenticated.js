import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error.js";

class UnauthenticatedError extends CustomError {
  constructor(message) {
    // We don’t initialize statusCode in the constructor as it’s fixed for this subclass. Instead, we set it directly within the constructor.
    super(message); // Calls the constructor of the parent class CustomError, which in turn calls the constructor of the Error class
    this.statusCode = StatusCodes.UNAUTHORIZED; // Manually sets statusCode
  }
}

export { UnauthenticatedError };
