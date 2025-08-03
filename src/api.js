// src/api.js
import axios from "axios";
const BASE_URL = "/api";
const FUNCTION_KEY = process.env.REACT_APP_FUNCTION_KEY
if (!FUNCTION_KEY) {
    throw new Error("REACT_APP_FUNCTION_KEY is not defined. Please set it in your .env file.");
}
// axios.defaults.headers.common["x-functions-key"] = FUNCTION_KEY;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.params = {}
// axios.defaults.params["code"] = FUNCTION_KEY;
export const generateBlogPost = (data) =>
    axios.post(`${BASE_URL}/blog-post`, data);

export const uploadData = (formData) =>
    axios.post(`${BASE_URL}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const getPreferences = (userId) =>
    axios.get(`${BASE_URL}/preferences/${userId}`);

export const savePreferences = (userId, data) =>
    axios.post(`${BASE_URL}/preferences/${userId}`, data);

export const getHistory = (userId, postId = null) => {
    // If postId is provided, fetch version history; else, fetch all posts
    const url = postId
        ? `${BASE_URL}/posts/${userId}/${postId}`
        : `${BASE_URL}/posts/${userId}`;
    return axios.get(url);
};

export const revertPost = (postId, toVersion) =>
    axios.post(`${BASE_URL}/blog-post/${postId}/revert?to_version=${toVersion}`);

export const comparePosts = (postId, v1, v2) =>
    axios.get(`${BASE_URL}/blog-post/${postId}/compare?version1=${v1}&version2=${v2}`);
