export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6543";

function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("role");
}

async function request(path, options = {}) {
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(BASE_URL + path, { ...options, headers });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
      throw { error: "Sesi Anda telah berakhir. Silakan login kembali." };
    }
    throw data || { error: "Request failed" };
  }
  return data;
}

export async function login(email, password) {
  return request("/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function register(payload) {
  return request("/register", { method: "POST", body: JSON.stringify(payload) });
}

export async function getJobs(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request("/jobs" + (query ? `?${query}` : ""));
}

export async function getJob(id) {
  return request(`/jobs/${id}`);
}

export async function createJob(payload) {
  return request("/create-job", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateJob(id, payload) {
  return request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function deleteJob(id) {
  return request(`/jobs/${id}`, { method: "DELETE" });
}

export async function getProfile() {
  return request("/profile");
}

export async function updateProfile(payload) {
  return request("/profile", { method: "PUT", body: JSON.stringify(payload) });
}

export async function uploadCV(file) {
  const formData = new FormData();
  formData.append("cv", file);

  const token = getToken();
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(BASE_URL + "/upload-cv", {
    method: "POST",
    headers,
    body: formData,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
      throw { error: "Sesi Anda telah berakhir. Silakan login kembali." };
    }
    throw data || { error: "Request failed" };
  }
  return data;
}

export async function applyToJob(job_id) {
  return request("/applications", { method: "POST", body: JSON.stringify({ job_id }) });
}

export async function getMyApplications() {
  return request("/my-applications");
}

export async function getJobApplicants(job_id) {
  return request(`/jobs/${job_id}/applications`);
}

export async function updateApplicationStatus(id, status) {
  return request(`/applications/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
}

export { getToken, getRole };
