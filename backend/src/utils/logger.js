/**
 * @file Configures an application-wide logger for writing log files.
 */

import winston from "winston";
import env from "../env";

const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const colors = {
  emerg: "red",
  alert: "red",
  crit: "red",
  error: "red",
  warning: "yellow",
  notice: "blue",
  info: "green",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} ${info.level}: ${info.message}${
        info.stack ? ` - ${info.stack}` : ""
      }`
  )
);

const transports = [new winston.transports.Console()];

if (env.logger.filename) {
  transports.push(
    new winston.transports.File({
      filename: env.logger.filename,
      format: winston.format.combine(format, winston.format.uncolorize()),
    })
  );
}

const logger = winston.createLogger({
  level: env.logger.level,
  levels,
  format,
  transports,
});

export default logger;
