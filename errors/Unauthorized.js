const CustomError = require('./CustomError');
const { StatusCodes } = require('http-status-codes');

class Unauthorized extends CustomError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
