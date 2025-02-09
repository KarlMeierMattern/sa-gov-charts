class CustomError extends Error {
  constructor(message, statusCode) {
    // Initialises both the built-in Error (with message) and adds a custom property (statusCode).
    // Different subclasses of CustomError require different status codes, so we pass statusCode to the constructor of the parent class CustomError, making it dynamic.
    super(message); // Calls the constructor of the built-in Error class, which is designed to accept only the error message.
    this.statusCode = statusCode; // This attaches statusCode as a custom property to the error instance.
  }
}

export { CustomError };
