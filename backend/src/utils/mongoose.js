import mongoose from "mongoose";
import logger from "./logger";

const connection = mongoose.createConnection();

connection.on("error", (err) =>
  logger.error("Database connection error occurred", err)
);

connection.on("connected", () => {
  logger.notice(
    `Database connection established to 'mongodb://${connection.host}:${
      connection.port
    }/${connection.name || ""}'`
  );
});

connection.on("disconnected", () =>
  logger.notice("Database connection closed")
);

export default connection;
