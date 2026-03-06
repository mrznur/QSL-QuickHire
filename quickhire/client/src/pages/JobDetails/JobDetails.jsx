import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { applyToJob, getJobById } from "../../api/api.js";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getJobById(id);
        setJob(data);
      } catch (e) {
        setErr(e.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErr("");
    setSuccessMsg("");

    try {
      await applyToJob({ jobId: id, ...form });
      setSuccessMsg("Application submitted successfully!");
      setForm({ name: "", email: "", resumeLink: "", coverNote: "" });
    } catch (e2) {
      setErr(e2.message || "Failed to apply");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="link link-hover opacity-80">
          ← Back to jobs
        </Link>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : err ? (
          <div className="alert alert-error mt-6">{err}</div>
        ) : !job ? (
          <div className="alert mt-6">Job not found.</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <div className="card bg-base-100 border">
                <div className="card-body">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      <p className="opacity-80 mt-1">{job.company}</p>
                    </div>
                    <div className="badge badge-outline">{job.jobType}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="badge badge-ghost">{job.category}</span>
                    <span className="badge badge-ghost">{job.location}</span>
                    {job.salaryRange ? (
                      <span className="badge badge-ghost">
                        {job.salaryRange}
                      </span>
                    ) : null}
                  </div>

                  <div className="divider" />

                  <h2 className="font-semibold text-lg">Job Description</h2>
                  <p className="opacity-90 whitespace-pre-line mt-2">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="card bg-base-100 border">
                <div className="card-body">
                  <h2 className="text-lg font-bold">Apply Now</h2>

                  {successMsg ? (
                    <div className="alert alert-success mt-3">{successMsg}</div>
                  ) : null}
                  {err ? (
                    <div className="alert alert-error mt-3">{err}</div>
                  ) : null}

                  <form className="mt-3 space-y-3" onSubmit={submit}>
                    <input
                      className="input input-bordered w-full"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                    />
                    <input
                      className="input input-bordered w-full"
                      placeholder="Email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                    />
                    <input
                      className="input input-bordered w-full"
                      placeholder="Resume link (Google Drive / Dropbox)"
                      value={form.resumeLink}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, resumeLink: e.target.value }))
                      }
                      required
                    />
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Cover note (optional)"
                      rows={4}
                      value={form.coverNote}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, coverNote: e.target.value }))
                      }
                    />

                    <button
                      className={`btn btn-primary w-full ${submitting ? "btn-disabled" : ""}`}
                      type="submit"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>

                  <p className="text-xs opacity-70 mt-3">
                    Tip: use a public resume link (view permission enabled).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
