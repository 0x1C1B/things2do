// eslint-disable-next-line no-unused-vars
import { AxiosResponse } from "axios";
import client from "./client";

/**
 * @typedef {object} MilestoneDTO
 * @property {string} id
 * @property {string} name
 * @property {string=} description
 * @property {boolean} finished
 * @property {string} taskId
 */

/**
 * Loads all available milestones of a task from server.
 *
 * @param {string} taskId Unique identifier of the task
 * @returns {Promise<AxiosResponse<[MilestoneDTO]>>} Returns the API response
 */
export const fetchMilestonesOfTask = (taskId) => {
  return client.get(`/tasks/${taskId}/milestones`);
};

/**
 * Loads a single milestone.
 *
 * @param {string} id Unique identifier of the resource
 * @returns {Promise<AxiosResponse<MilestoneDTO>>} Returns the API response
 */
export const fetchMilestone = (id) => {
  return client.get(`/milestones/${id}`);
};

/**
 * Create a new milestone in task.
 *
 * @param {string} taskId Unique identifier of the task
 * @param {{name: string, description: string|undefined}} data Fields of the new milestone to be created
 * @returns {Promise<AxiosResponse<MilestoneDTO>>} Returns the API response
 */
export const createMilestoneInTask = (taskId, data) => {
  return client.post(`/tasks/${taskId}/milestones`, data);
};

/**
 * Update an existing milestone by its identifier.
 *
 * @param {string} id Unique identifier of the resource
 * @param {{name: string|undefined, description: string|undefined, finished: boolean|undefined}} data Fields of the milestone to be updated
 * @returns {Promise<AxiosResponse<MilestoneDTO>>} Returns the API response
 */
export const updateMilestone = (id, data) => {
  return client.patch(`/milestones/${id}`, data);
};

/**
 * Deletes an existing milestone by its identifier.
 *
 * @param {string} id Unique identifier of the resource
 * @returns {Promise<AxiosResponse>} Returns the API response
 */
export const deleteMilestone = (id) => {
  return client.delete(`/milestones/${id}`);
};
