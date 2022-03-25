import joi from "joi";
import { NotFoundError } from "restify-errors";
import TaskModel from "../models/task.model";
import { assertValid } from "../utils/validation";

export default class TaskService {
  async findById(taskId) {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      throw new NotFoundError("Resource doesn't exist");
    }

    return TaskService._toDTO(task);
  }

  async findAll(groupId) {
    const tasks = await TaskModel.find({ groupId });
    return tasks.map((task) => TaskService._toDTO(task));
  }

  async create(groupId, doc) {
    assertValid(
      joi.object({
        name: joi.string().max(200).required(),
        description: joi.string().max(2000).optional(),
        priority: joi.number().integer().min(1).max(10).optional(),
        expiresAt: joi.date().iso().min("now").optional(),
      }),
      doc
    );

    const task = await TaskModel.create({ ...doc, groupId });
    return TaskService._toDTO(task);
  }

  async updateById(taskId, update) {
    assertValid(
      joi.object({
        name: joi.string().max(200).optional(),
        description: joi.string().max(2000).allow(null).optional(),
        priority: joi.number().integer().min(1).max(10).allow(null).optional(),
        expiresAt: joi.date().iso().min("now").allow(null).optional(),
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

    const task = await TaskModel.findByIdAndUpdate(taskId, changes, {
      new: true,
    });

    if (!task) {
      throw new NotFoundError("Resource doesn't exist");
    }

    return TaskService._toDTO(task);
  }

  async deleteById(taskId) {
    const task = await TaskModel.findByIdAndDelete(taskId);

    if (!task) {
      throw new NotFoundError("Resource doesn't exist");
    }
  }

  // eslint-disable-next-line class-methods-use-this
  static _toDTO(doc) {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description || undefined,
      priority: doc.priority || undefined,
      expiresAt: doc.expiresAt || undefined,
      finished: doc.finished,
      groupId: typeof doc.groupId === "object" ? doc.groupId._id : doc.groupId,
    };
  }
}
