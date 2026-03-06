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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const res = await fetch(`${BASE_URL}/api/jobs${qs}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    const data = await res.json();
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("Request timed out — is the backend server running?");
    }
    throw err;
  }
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
  try {
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
  } catch (err) {
    throw err;
  }
}

export async function getApplications() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${BASE_URL}/api/applications`, {
      signal: controller.signal,
      headers: {
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY || "",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to fetch applications");
    }
    return res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("Request timed out — is the backend server running?");
    }
    throw err;
  }
}

export async function deleteApplication(id) {
  const res = await fetch(`${BASE_URL}/api/applications/${id}`, {
    method: "DELETE",
    headers: {
      "x-admin-key": import.meta.env.VITE_ADMIN_KEY || "",
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete application");
  }
  return res.json();
}
