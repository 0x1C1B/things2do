import { existsSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
// eslint-disable-next-line no-unused-vars
import { Server, Request, Response } from "restify";
import { NotFoundError } from "restify-errors";
import { asyncError } from "../utils/error";

export default class RootController {
  /**
   * Transfers the openapi specification of this API.
   *
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @private
   */
  async _fetchOpenApi(req, res) {
    const openApiPath = path.resolve(__dirname, "../../resources/openapi.yml");

    if (!existsSync(openApiPath)) {
      throw new NotFoundError("Resource doesn't exist");
    }

    const content = await readFile(openApiPath);

    res.status(200);
    res.header("Content-Disposition", "attachment; filename=openapi.yml");
    res.header("Content-Type", "application/openapi+yaml");
    res.sendRaw(content);
  }

  /**
   * The individual handlers of the controller are registered with the server.
   *
   * @param {Server} server The web server for which the controller should be registered
   * @public
   */
  register(server) {
    server.get("/openapi.yml", asyncError(this._fetchOpenApi.bind(this)));
  }
}
