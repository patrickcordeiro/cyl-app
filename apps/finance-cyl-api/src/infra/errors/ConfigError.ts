import { CustomError } from '@shared/errors';

/**
 * Custom error with message and status code 500
 */
export class ConfigError extends CustomError {
  /**
   * @param {string} message Error message
   */
  constructor(message: string) {
    super(message, 500);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
