// eslint-disable-next-line no-unused-vars
import { Server, Request, Response } from "restify";
// eslint-disable-next-line no-unused-vars
import TaskService from "../services/task.service";
import { asyncError } from "../utils/error";

export default class TaskController {
  constructor(taskService) {
    this._taskService = taskService;
  }

  async _findById(req, res) {
    const { taskId } = req.params;
    const task = await this._taskService.findById(taskId);

    res.status(200);
    res.json(task);
  }

  async _findAll(req, res) {
    const { groupId } = req.params;
    const tasks = await this._taskService.findAll(groupId);

    res.status(200);
    res.json(tasks);
  }

  async _create(req, res) {
    const { groupId } = req.params;
    const task = await this._taskService.create(groupId, req.body);

    res.status(201);
    res.header(
      "Location",
      `/groups/${groupId}/tasks/${encodeURIComponent(task.id)}`
    );
    res.json(task);
  }

  async _updateById(req, res) {
    const { taskId } = req.params;
    const task = await this._taskService.updateById(taskId, req.body);

    res.status(200);
    res.json(task);
  }

  async _deleteById(req, res) {
    const { taskId } = req.params;
    await this._taskService.deleteById(taskId);

    res.status(204);
    res.send();
  }

  register(server) {
    server.get("/tasks/:taskId", asyncError(this._findById.bind(this)));
    server.get("/groups/:groupId/tasks", asyncError(this._findAll.bind(this)));
    server.post("/groups/:groupId/tasks", asyncError(this._create.bind(this)));
    server.patch("/tasks/:taskId", asyncError(this._updateById.bind(this)));
    server.del("/tasks/:taskId", asyncError(this._deleteById.bind(this)));
  }
}
