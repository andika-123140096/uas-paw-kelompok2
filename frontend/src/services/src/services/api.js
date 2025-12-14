// API Base URL - Ganti dengan URL backend temanmu
const API_BASE_URL = "http://localhost:5000/api";

// Helper function untuk fetch dengan error handling
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};

// Jobs API
export const jobsAPI = {
  getAllJobs: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/jobs${queryString ? `?${queryString}` : ""}`);
  },

  getJobById: async (id) => {
    return fetchAPI(`/jobs/${id}`);
  },

  createJob: async (jobData) => {
    return fetchAPI("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  },

  updateJob: async (id, jobData) => {
    return fetchAPI(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(jobData),
    });
  },

  deleteJob: async (id) => {
    return fetchAPI(`/jobs/${id}`, {
      method: "DELETE",
    });
  },
};

// Applications API
export const applicationsAPI = {
  apply: async (applicationData) => {
    return fetchAPI("/applications", {
      method: "POST",
      body: JSON.stringify(applicationData),
    });
  },

  getMyApplications: async () => {
    return fetchAPI("/applications/my");
  },

  getApplicationsForJob: async (jobId) => {
    return fetchAPI(`/applications/job/${jobId}`);
  },

  updateApplicationStatus: async (id, status) => {
    return fetchAPI(`/applications/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};

// Profile API
export const profileAPI = {
  getProfile: async () => {
    return fetchAPI("/profile");
  },

  updateProfile: async (profileData) => {
    return fetchAPI("/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },
};
