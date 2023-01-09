class ApplicationError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.name = this.constructor.name;
    this.message = message || '오류가 발생했습니다. 다시 시도하세요.';
    this.statusCode = statusCode;
  }
}

module.exports = ApplicationError;
