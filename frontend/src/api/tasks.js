// eslint-disable-next-line no-unused-vars
import { AxiosResponse } from "axios";
import client from "./client";

/**
 * @typedef {object} TaskDTO
 * @property {string} id
 * @property {string} name
 * @property {string=} description
 * @property {number=} priority
 * @property {string=} expiresAt
 * @property {boolean} finished
 * @property {string} groupId
 */

/**
 * Loads all available tasks of a group from server.
 *
 * @param {string} groupId Unique identifier of the group
 * @returns {Promise<AxiosResponse<[TaskDTO]>>} Returns the API response
 */
export const fetchTasksOfGroup = (groupId) => {
  return client.get(`/groups/${groupId}/tasks`);
};

/**
 * Loads a single task.
 *
 * @param {string} id Unique identifier of the resource
 * @returns {Promise<AxiosResponse<TaskDTO>>} Returns the API response
 */
export const fetchTask = (id) => {
  return client.get(`/tasks/${id}`);
};

/**
 * Create a new task in group.
 *
 * @param {string} groupId Unique identifier of the group
 * @param {{name: string, description: string|undefined, priority: number|undefined, expiresAt: string|undefined}} data Fields of the new task to be created
 * @returns {Promise<AxiosResponse<TaskDTO>>} Returns the API response
 */
export const createTaskInGroup = (groupId, data) => {
  return client.post(`/groups/${groupId}/tasks`, data);
};

/**
 * Update an existing task by its identifier.
 *
 * @param {string} id Unique identifier of the resource
 * @param {{name: string|undefined, description: string|undefined, priority: number|undefined, expiresAt: string|undefined, finished: boolean|undefined}} data Fields of the task to be updated
 * @returns {Promise<AxiosResponse<TaskDTO>>} Returns the API response
 */
export const updateTask = (id, data) => {
  return client.patch(`/tasks/${id}`, data);
};

/**
 * Deletes an existing task by its identifier.
 *
 * @param {string} id Unique identifier of the resource
 * @returns {Promise<AxiosResponse>} Returns the API response
 */
export const deleteTask = (id) => {
  return client.delete(`/tasks/${id}`);
};
