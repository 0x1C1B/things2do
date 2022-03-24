import joi from "joi";
import { NotFoundError } from "restify-errors";
import GroupModel from "../models/group.model";
import { assertValid } from "../utils/validation";

/**
 * @typedef {object} GroupDTO
 * @property {string} id
 * @property {string} name
 * @property {string} description
 */

/**
 * Group domain service. Responsible for data persistence and business
 * logic in the group domain.
 */
export default class GroupService {
  /**
   * Finds a single group by its identifier.
   *
   * @param {string} groupId Unique MongoDB identifier
   * @returns {Promise<GroupDTO>} Returns the loaded group
   * @public
   */
  async findById(groupId) {
    const group = await GroupModel.findById(groupId);

    if (!group) {
      throw new NotFoundError("Resource doesn't exist");
    }

    return GroupService._toDTO(group);
  }

  /**
   * Loads all available groups.
   *
   * @returns {Promise<[GroupDTO]>} Returns the loaded groups
   * @public
   */
  async findAll() {
    const groups = await GroupModel.find();
    return groups.map((group) => GroupService._toDTO(group));
  }

  /**
   * Creates a new group.
   *
   * @param {any} doc Fields of new group to create
   * @returns {Promise<GroupDTO>} Returns the newly created group
   * @public
   */
  async create(doc) {
    assertValid(
      joi.object({
        name: joi.string().max(200).required(),
        description: joi.string().max(2000).optional(),
      }),
      doc
    );

    const group = await GroupModel.create(doc);
    return GroupService._toDTO(group);
  }

  /**
   * Updates an existing group by its identifier.
   *
   * @param {string} groupId Unique MongoDB identifier
   * @param {any} update Fields to be updated
   * @returns {Promise<GroupDTO>} Returns the updated group
   * @public
   */
  async updateById(groupId, update) {
    assertValid(
      joi.object({
        name: joi.string().max(200).optional(),
        description: joi.string().max(2000).allow(null).optional(),
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

    const group = await GroupModel.findByIdAndUpdate(groupId, changes, {
      new: true,
    });

    if (!group) {
      throw new NotFoundError("Resource doesn't exist");
    }

    return GroupService._toDTO(group);
  }

  /**
   * Deletes an existing group by its identifier.
   *
   * @param {string} groupId Unique MongoDB identifier
   * @public
   */
  async deleteById(groupId) {
    const group = await GroupModel.findByIdAndDelete(groupId);

    if (!group) {
      throw new NotFoundError("Resource doesn't exist");
    }
  }

  /**
   * Maps a MongoDB document to a DTO (Data Transfer Object).
   *
   * @param {any} doc MongoDB document loaded from database
   * @returns {GroupDTO} Returns the DTO representation
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  static _toDTO(doc) {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description || undefined,
    };
  }
}
