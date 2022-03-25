import joi from "joi";
import { NotFoundError } from "restify-errors";
import MilestoneModel from "../models/milestone.model";
import { assertValid } from "../utils/validation";

export default class MilestoneService {
  async findById(milestoneId) {
    const milestone = await MilestoneModel.findById(milestoneId);

    if (!milestone) {
      throw new NotFoundError("Resource doesn't exist");
    }

    return MilestoneService._toDTO(milestone);
  }

  async findAll(taskId) {
    const milestones = await MilestoneModel.find({ taskId });
    return milestones.map((milestone) => MilestoneService._toDTO(milestone));
  }

  async create(taskId, doc) {
    assertValid(
      joi.object({
        name: joi.string().max(200).required(),
        description: joi.string().max(2000).optional(),
      }),
      doc
    );

    const milestone = await MilestoneModel.create({ ...doc, taskId });
    return MilestoneService._toDTO(milestone);
  }

  async updateById(milestoneId, update) {
    assertValid(
      joi.object({
        name: joi.string().max(200).optional(),
        description: joi.string().max(2000).allow(null).optional(),
        finished: joi.boolean().optional(),
      }),
      update
    );

    const changes = { $set: {}, $unset: {} };

    Object.keys(update).forEach((key) => {
      changes.$set[key] = update[key];

      // Allow to clear optional fields again
      if (key === null) {
        changes.$unset[key] = 1;
      }
    });

    const milestone = await MilestoneModel.findByIdAndUpdate(
      milestoneId,
      changes,
      {
        new: true,
      }
    );

    if (!milestone) {
      throw new NotFoundError("Resource doesn't exist");
    }

    return MilestoneService._toDTO(milestone);
  }

  async deleteById(milestoneId) {
    const milestone = await MilestoneModel.findByIdAndDelete(milestoneId);

    if (!milestone) {
      throw new NotFoundError("Resource doesn't exist");
    }
  }

  // eslint-disable-next-line class-methods-use-this
  static _toDTO(doc) {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description || undefined,
      finished: doc.finished,
      taskId: typeof doc.taskId === "object" ? doc.taskId._id : doc.taskId,
    };
  }
}
