import { CustomError } from '@shared/errors';

/**
 * Custom error with message and status code 415
 */
export class UnsupportedMediaTypeError extends CustomError {
  /**
   * @param {string} mediaType Media type - Ex: `image/jpg`
   */
  constructor(readonly mediaType: string) {
    super(mediaType, 415);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
