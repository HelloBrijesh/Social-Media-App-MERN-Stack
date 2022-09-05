class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static emailExists(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredential(message) {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message) {
    return new CustomErrorHandler(402, message);
  }
}

export default CustomErrorHandler;
