// eslint-disable-next-line no-unused-vars
import { Request, Response, Next } from "restify";

/**
 * Intercepts errors that occur asynchronously in the controller and
 * forwards them to the middleware chain.
 *
 * @param {(req: Request, res: Response, next: Next) => void} handler Handler of the controller
 * @returns {(req: Request, res: Response, next: Next) => void} Returns the wrapped handler
 */
// eslint-disable-next-line import/prefer-default-export
export function asyncError(handler) {
  return (req, res, next) => {
    try {
      return handler(req, res, next)?.catch((err) => {
        return next(err);
      });
    } catch (err) {
      return next(err);
    }
  };
}
