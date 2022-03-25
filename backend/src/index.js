#!/usr/bin/env node

/**
 * @file Application start up script which loads the environment, sets up an HTTP server and starts the application.
 */
import util from "util";
import restify from "restify";
import errors from "restify-errors";
import cors from "cors";
import env from "./env";
import logger from "./utils/logger";
import morgan from "./utils/morgan";
import mongoose from "./utils/mongoose";
import GroupService from "./services/group.service";
import TaskService from "./services/task.service";
import RootController from "./controllers/root.controller";
import GroupController from "./controllers/group.controller";
import TaskController from "./controllers/task.controller";

const app = restify.createServer();

const groupService = new GroupService();
const taskService = new TaskService();

const rootController = new RootController();
const groupController = new GroupController(groupService);
const taskController = new TaskController(taskService);

app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser());
app.use(
  restify.plugins.throttle({
    burst: env.security.requestLimit.burst,
    rate: env.security.requestLimit.rate,
    ip: true,
  })
);
app.use(cors());
app.use(morgan());

const onRestifyError = (req, res, err, next) => {
  if (!(err instanceof errors.HttpError)) {
    logger.error("Unexpected internal error occurred", err);
  }

  next();
};

const onServerError = (err) => {
  if (err.syscall !== "listen") {
    throw err;
  }

  switch (err.code) {
    case "EACCES":
      // eslint-disable-next-line no-console
      logger.error("Binding requires elevated privileges", err);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // eslint-disable-next-line no-console
      logger.error("Binding is already in use", err);
      process.exit(1);
      break;
    default:
      throw err;
  }
};

app.on("error", onServerError);
app.on("restifyError", onRestifyError);

process.on("SIGINT", () => {
  util
    .promisify(app.close)()
    .then(mongoose.close())
    .then(() => logger.notice("Application stopped"))
    .finally(() => process.exit(0));
});

function setup() {
  logger.notice("Application is starting");
  logger.notice(`Environment of profile '${env.profile}' was loaded`);
  logger.notice(`Logger level was set to '${env.logger.level}'`);

  rootController.register(app);
  groupController.register(app);

  mongoose
    .openUri(env.database.uri)
    .then(() => app.listen(env.port))
    .then(() => {
      logger.notice(
        `Application started and is listening on port '${env.port}'`
      );
    });
}

// Application entry point
setup();
