const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") query.set(k, v);
  });
  const s = query.toString();
  return s ? `?${s}` : "";
}

export async function getJobs({
  search = "",
  category = "",
  location = "",
} = {}) {
  const qs = buildQuery({ search, category, location });
  const res = await fetch(`${BASE_URL}/api/jobs${qs}`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function getJobById(id) {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch job");
  return res.json();
}

export async function createJob(jobData) {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": import.meta.env.VITE_ADMIN_KEY || "",
    },
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create job");
  }
  return res.json();
}

export async function deleteJob(id) {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-key": import.meta.env.VITE_ADMIN_KEY || "",
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete job");
  }
  return res.json();
}

export async function applyToJob(payload) {
  const res = await fetch(`${BASE_URL}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to apply");
  }
  return res.json();
}
