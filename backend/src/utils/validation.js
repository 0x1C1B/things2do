import { UnprocessableEntityError } from "restify-errors";

// eslint-disable-next-line no-unused-vars
import joi from "joi";

import logger from "./logger";

/**
 * Allows to validate a document.
 *
 * @param {joi.Schema} schema Schema that the data structure must match
 * @param {any} doc Document to validate
 * @returns {any} Returns the validated and optionally transformed data structure
 */
// eslint-disable-next-line import/prefer-default-export
export const assertValid = (schema, doc) => {
  const { error, value } = schema.validate(doc, { abortEarly: false });

  if (error) {
    logger.debug("Request validation failed", error);
    throw new UnprocessableEntityError("Request validation failed");
  } else {
    return value;
  }
};
