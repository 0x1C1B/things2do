/**
 * @file Responsible for logging HTTP requests during the development phase or, if desired, in productive operation.
 */

import morgan from "morgan";
import logger from "./logger";

const stream = {
  write: (message) =>
    logger.debug(message.substring(0, message.lastIndexOf("\n"))),
};

const middleware = () =>
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream,
  });

export default middleware;
