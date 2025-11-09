import { CustomError } from '@shared/errors';

/**
 * Custom error with message and status code 401
 */
export class UnauthorizedError extends CustomError {
  /**
   * @param {string} customMessage Error message
   */
  constructor(readonly customMessage: string) {
    super(customMessage, 401);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
