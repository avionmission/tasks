import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth/me"),
};

// Task Lists API
export const taskListsAPI = {
  getAll: () => api.get("/task-lists"),
  getById: (id) => api.get(`/task-lists/${id}`),
  create: (data) => api.post("/task-lists", data),
  update: (id, data) => api.put(`/task-lists/${id}`, data),
  delete: (id) => api.delete(`/task-lists/${id}`),
};

// Tasks API
export const tasksAPI = {
  getAll: (taskListId) => api.get(`/task-lists/${taskListId}/tasks`),
  getById: (taskListId, taskId) =>
    api.get(`/task-lists/${taskListId}/tasks/${taskId}`),
  create: (taskListId, data) =>
    api.post(`/task-lists/${taskListId}/tasks`, data),
  update: (taskListId, taskId, data) =>
    api.put(`/task-lists/${taskListId}/tasks/${taskId}`, data),
  delete: (taskListId, taskId) =>
    api.delete(`/task-lists/${taskListId}/tasks/${taskId}`),
};

export default api;
