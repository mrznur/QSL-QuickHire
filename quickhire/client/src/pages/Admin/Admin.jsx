import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { createJob, deleteJob, getJobs } from "../../api/api.js";

export default function Admin() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "",
    description: "",
  });

  async function refresh() {
    setLoading(true);
    setErr("");
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (e) {
      setErr(e.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      await createJob(form);
      setMsg("Job created!");
      setForm({
        title: "",
        company: "",
        location: "",
        category: "Development",
        jobType: "Full-time",
        salaryRange: "",
        description: "",
      });
      refresh();
    } catch (e2) {
      setErr(e2.message || "Failed to create job (check admin key)");
    }
  }

  async function remove(id) {
    setMsg("");
    setErr("");
    try {
      await deleteJob(id);
      setMsg("Job deleted!");
      refresh();
    } catch (e) {
      setErr(e.message || "Failed to delete job (check admin key)");
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Admin</h1>
        <p className="opacity-80 mt-2">Add and manage job listings.</p>

        {msg ? <div className="alert alert-success mt-4">{msg}</div> : null}
        {err ? <div className="alert alert-error mt-4">{err}</div> : null}

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="card bg-base-100 border">
            <div className="card-body">
              <h2 className="font-bold text-lg">Add Job</h2>

              <form className="mt-3 space-y-3" onSubmit={submit}>
                <input
                  className="input input-bordered w-full"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="Company"
                  value={form.company}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, company: e.target.value }))
                  }
                  required
                />
                <input
                  className="input input-bordered w-full"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    className="select select-bordered w-full"
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Finance</option>
                    <option>Operations</option>
                  </select>

                  <select
                    className="select select-bordered w-full"
                    value={form.jobType}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, jobType: e.target.value }))
                    }
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Remote</option>
                    <option>Internship</option>
                    <option>Contract</option>
                  </select>
                </div>

                <input
                  className="input input-bordered w-full"
                  placeholder="Salary range (optional)"
                  value={form.salaryRange}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, salaryRange: e.target.value }))
                  }
                />

                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={5}
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                />

                <button className="btn btn-primary w-full" type="submit">
                  Create Job
                </button>
              </form>

              <p className="text-xs opacity-70 mt-3">
                Uses <code>VITE_ADMIN_KEY</code> in client .env header{" "}
                <code>x-admin-key</code>.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Jobs</h2>
                <button className="btn btn-outline btn-sm" onClick={refresh}>
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-10">
                  <span className="loading loading-spinner loading-lg" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="alert mt-4">No jobs yet.</div>
              ) : (
                <div className="mt-4 space-y-3">
                  {jobs.map((j) => (
                    <div
                      key={j._id}
                      className="flex items-start justify-between gap-3 border rounded-xl p-3"
                    >
                      <div>
                        <p className="font-semibold">{j.title}</p>
                        <p className="text-sm opacity-70">
                          {j.company} • {j.location}
                        </p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="badge badge-ghost">
                            {j.category}
                          </span>
                          <span className="badge badge-outline">
                            {j.jobType}
                          </span>
                        </div>
                      </div>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => remove(j._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
