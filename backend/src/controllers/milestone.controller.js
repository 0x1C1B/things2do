import { asyncError } from "../utils/error";

export default class MilestoneController {
  constructor(milestoneService) {
    this._milestoneService = milestoneService;
  }

  async _findById(req, res) {
    const { milestoneId } = req.params;
    const milestones = await this._milestoneService.findById(milestoneId);

    res.status(200);
    res.json(milestones);
  }

  async _findAll(req, res) {
    const { taskId } = req.params;
    const milestones = await this._milestoneService.findAll(taskId);

    res.status(200);
    res.json(milestones);
  }

  async _create(req, res) {
    const { taskId } = req.params;
    const milestone = await this._milestoneService.create(taskId, req.body);

    res.status(201);
    res.header(
      "Location",
      `/tasks/${taskId}/milestones/${encodeURIComponent(milestone.id)}`
    );
    res.json(milestone);
  }

  async _updateById(req, res) {
    const { milestoneId } = req.params;
    const milestone = await this._milestoneService.updateById(
      milestoneId,
      req.body
    );

    res.status(200);
    res.json(milestone);
  }

  async _deleteById(req, res) {
    const { milestoneId } = req.params;
    await this._milestoneService.deleteById(milestoneId);

    res.status(204);
    res.send();
  }

  register(server) {
    server.get(
      "/milestones/:milestoneId",
      asyncError(this._findById.bind(this))
    );
    server.get(
      "/tasks/:taskId/milestones",
      asyncError(this._findAll.bind(this))
    );
    server.post(
      "/tasks/:taskId/milestones",
      asyncError(this._create.bind(this))
    );
    server.patch(
      "/milestones/:milestoneId",
      asyncError(this._updateById.bind(this))
    );
    server.del(
      "/milestones/:milestoneId",
      asyncError(this._deleteById.bind(this))
    );
  }
}
