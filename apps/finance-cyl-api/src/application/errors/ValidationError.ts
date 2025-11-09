import { CustomError } from '@shared/errors';
/**
 * Custom error with validation message and status code 400
 */
export class ValidationError extends CustomError {
  /**
   * @param {string[]} fields Array of invalid fields
   */
  constructor(readonly fields: Array<string | number | symbol>) {
    const fieldsAsString = fields.join(', ');
    super(fieldsAsString, 400);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
