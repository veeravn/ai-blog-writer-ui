// src/api.js
import axios from "axios";
const BASE_URL = "https://aiblogwriter.azurewebsites.net";

export const generateBlogPost = (data) =>
    axios.post(`${BASE_URL}/blog-post`, data);

export const uploadData = (formData) =>
    axios.post(`${BASE_URL}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });

export const getPreferences = (userId) =>
    axios.get(`${BASE_URL}/preferences/${userId}`);

export const savePreferences = (userId, data) =>
    axios.post(`${BASE_URL}/preferences/${userId}`, data);

export const getHistory = (userId) =>
    axios.get(`${BASE_URL}/history/${userId}`);

export const revertPost = (postId, toVersion) =>
    axios.post(`${BASE_URL}/blog-post/${postId}/revert?to_version=${toVersion}`);

export const comparePosts = (postId, v1, v2) =>
    axios.get(`${BASE_URL}/blog-post/${postId}/compare?version1=${v1}&version2=${v2}`);
