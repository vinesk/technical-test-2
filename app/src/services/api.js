import "isomorphic-fetch";

import { apiURL } from "../config";

const api = {
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  get: async (path) => {
    try {
      const token = api.getToken();

      if (!token && !path.includes("/auth") && path !== "/user/signin_token") {
        return { ok: false, user: null };
      }

      const response = await fetch(`${apiURL}${path}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });

      if (response.status === 401) {
        api.setToken(null);
        return { ok: false, user: null };
      }

      const data = await response.json();
      return { ...data, ok: response.ok };
    } catch (error) {
      console.log(error);
      return { ok: false, user: null };
    }
  },

  put: async (path, body) => {
    try {
      const token = api.getToken();
      const response = await fetch(`${apiURL}${path}`, {
        mode: "cors",
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: `JWT ${token}` },
        body: typeof body === "string" ? body : JSON.stringify(body),
      });

      const res = await response.json();
      return res;
    } catch (e) {
      throw {
        code: e.code || "NETWORK_ERROR",
        status: e.status || 500,
        message: e.message || "Network error occurred",
      };
    }
  },

  remove: async (path) => {
    try {
      const token = api.getToken();
      const response = await fetch(`${apiURL}${path}`, {
        mode: "cors",
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: `JWT ${token}` },
      });
      const res = await response.json();
      return res;
    } catch (e) {
      throw {
        code: e.code || "NETWORK_ERROR",
        status: e.status || 500,
        message: e.message || "Network error occurred",
      };
    }
  },

  post: async (path, body) => {
    try {
      const token = api.getToken();
      const response = await fetch(`${apiURL}${path}`, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: typeof body === "string" ? body : JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          code: data.code || (response.status === 401 ? "INVALID_CREDENTIALS" : response.status === 409 ? "USER_ALREADY_REGISTERED" : "SERVER_ERROR"),
          status: response.status,
          message: data.message || "Une erreur est survenue",
        };
      }

      return data;
    } catch (e) {
      throw {
        code: e.code || "NETWORK_ERROR",
        status: e.status || 500,
        message: e.message || "Erreur de connexion",
      };
    }
  },
};

export default api;
