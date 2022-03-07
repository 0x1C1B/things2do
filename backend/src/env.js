/**
 * @file Module that loads the environment variables from an environment file when loaded itself.
 */

import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import joi from "joi";

function loadEnvironmentFiles() {
  /**
   * Paths in which to search for environment files.
   *
   * Basically, environment files are searched for in the current working directory and in
   * the 'resources' folder in the project directory.
   *
   * The order of the paths is essential, the environment files are read in this order.
   * Environment files that are already set and appear again in a later file are not set
   * again. That is, values of higher-ordered paths have higher priority and "override"
   * values of lower-ordered paths.
   */
  const locations = [
    path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
    path.resolve(__dirname, `../resources/.env.${process.env.NODE_ENV}`),
    path.resolve(process.cwd(), ".env"),
    path.resolve(__dirname, "../resources/.env"),
  ];

  locations.forEach((location) => {
    if (fs.existsSync(location)) {
      dotenv.config({ path: location });
    }
  });
}

/*
 * Expands the set environment variables by the configuration of the environment files.
 */

loadEnvironmentFiles();

const envSchema = joi
  .object()
  .keys({
    LOGGER_LEVEL: joi
      .string()
      .valid(
        "emerg",
        "alert",
        "crit",
        "error",
        "warning",
        "notice",
        "info",
        "debug"
      )
      .default("notice"),
    LOGGER_FILENAME: joi.string().optional(),
  })
  .unknown();

const { value: env, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  logger: {
    level: env.LOGGER_LEVEL,
    filename: env.LOGGER_FILENAME,
  },
};
