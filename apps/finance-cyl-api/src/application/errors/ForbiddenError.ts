import { CustomError } from '@shared/errors';

/**
 * Custom error with message and status code 403
 */
export class ForbiddenError extends CustomError {
  /**
   * @param {string} customMessage Error message
   */
  constructor(readonly customMessage: string) {
    super(customMessage, 403);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
