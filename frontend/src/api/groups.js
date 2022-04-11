// eslint-disable-next-line no-unused-vars
import { AxiosResponse } from "axios";
import client from "./client";

/**
 * @typedef {object} GroupDTO
 * @property {string} id
 * @property {string} name
 * @property {string} description
 */

/**
 * Loads all available task groups from server.
 *
 * @returns {Promise<AxiosResponse<[GroupDTO]>>} Returns the API response
 */
export const fetchGroups = () => {
  return client.get("/groups");
};

/**
 * Loads a single task group.
 *
 * @param {string} id Unique identifier of the resource
 * @returns {Promise<AxiosResponse<GroupDTO>>} Returns the API response
 */
export const fetchGroup = (id) => {
  return client.get(`/groups/${id}`);
};

/**
 * Create a new task group.
 *
 * @param {{name: string, description: string}} data Fields of the new group to be created
 * @returns {Promise<AxiosResponse<GroupDTO>>} Returns the API response
 */
export const createGroup = (data) => {
  return client.post("/groups", data);
};

/**
 * Update an existing task group by its identifier.
 *
 * @param {string} id Unique identifier of the resource
 * @param {{name: string|undefined, description: string|undefined}} data Fields of the group to be updated
 * @returns {Promise<AxiosResponse<GroupDTO>>} Returns the API response
 */
export const updateGroup = (id, data) => {
  return client.patch(`/groups/${id}`, data);
};

/**
 * Deletes an existing task group by its identifier.
 *
 * @param {string} id Unique identifier of the resource
 * @returns {Promise<AxiosResponse>} Returns the API response
 */
export const deleteGroup = (id) => {
  return client.delete(`/groups/${id}`);
};
