// eslint-disable-next-line no-unused-vars
import { Server, Request, Response } from "restify";
// eslint-disable-next-line no-unused-vars
import GroupService from "../services/group.service";
import { asyncError } from "../utils/error";

export default class GroupController {
  /**
   * Creates a RESTful controller for the group domain.
   *
   * @param {GroupService} groupService Instance of the business service of the group domain
   */
  constructor(groupService) {
    this._groupService = groupService;
  }

  /**
   * Loads a single group on request.
   *
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @private
   */
  async _findById(req, res) {
    const { groupId } = req.params;
    const group = await this._groupService.findById(groupId);

    res.status(200);
    res.json(group);
  }

  /**
   * Handles a request to load all available groups.
   *
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @private
   */
  async _findAll(req, res) {
    const groups = await this._groupService.findAll();

    res.status(200);
    res.json(groups);
  }

  /**
   * Covers creating new task groups.
   *
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @private
   */
  async _create(req, res) {
    const group = await this._groupService.create(req.body);

    res.status(201);
    res.header("Location", `/groups/${encodeURIComponent(group.id)}`);
    res.json(group);
  }

  /**
   * Allows updating of existing task groups.
   *
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @private
   */
  async _updateById(req, res) {
    const { groupId } = req.params;
    const group = await this._groupService.updateById(groupId, req.body);

    res.status(200);
    res.json(group);
  }

  /**
   * Makes it possible to delete existing groups.
   *
   * @param {Request} req The request object
   * @param {Response} res The response object
   * @private
   */
  async _deleteById(req, res) {
    const { groupId } = req.params;
    await this._groupService.deleteById(groupId);

    res.status(204);
    res.send();
  }

  /**
   * The individual handlers of the controller are registered with the server.
   *
   * @param {Server} server The web server for which the controller should be registered
   * @public
   */
  register(server) {
    server.get("/groups/:groupId", asyncError(this._findById.bind(this)));
    server.get("/groups", asyncError(this._findAll.bind(this)));
    server.post("/groups", asyncError(this._create.bind(this)));
    server.patch("/groups/:groupId", asyncError(this._updateById.bind(this)));
    server.del("/groups/:groupId", asyncError(this._deleteById.bind(this)));
  }
}
