import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { applyToJob, getJobById } from "../../api/api.js";

function JobDetails() {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-8 md:px-12 lg:px-16 py-10">
        <Link to="/jobs" className="text-[#4640DE] hover:underline font-epilogue flex items-center gap-2">
          <i className="fas fa-arrow-left"></i> Back to jobs
        </Link>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-[#4640DE]" />
          </div>
        ) : err ? (
          <div className="alert alert-error mt-6 font-epilogue">{err}</div>
        ) : !job ? (
          <div className="alert mt-6 font-epilogue">Job not found.</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4640DE&color=fff&size=64`}
                      alt={job.company}
                      className="w-16 h-16 rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold font-clash text-gray-900">{job.title}</h1>
                    <p className="text-xl text-gray-600 font-epilogue mt-2">{job.company}</p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-epilogue flex items-center gap-2">
                        <i className="fas fa-map-marker-alt"></i>
                        {job.location}
                      </span>
                      <span className="px-4 py-2 border-2 border-[#FFB836] text-[#FFB836] bg-[#FFF4E5] rounded-lg font-epilogue">
                        {job.jobType}
                      </span>
                      <span className="px-4 py-2 bg-[#4640DE] bg-opacity-10 text-[#4640DE] rounded-lg font-epilogue">
                        {job.category}
                      </span>
                      {job.salaryRange && (
                        <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-epilogue flex items-center gap-2">
                          <i className="fas fa-dollar-sign"></i>
                          {job.salaryRange}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-8"></div>

                <h2 className="text-2xl font-semibold font-clash text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-700 font-epilogue leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-bold font-clash text-gray-900 mb-6">Apply Now</h2>

                {successMsg && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-2xl"></i>
                      </div>
                      <h3 className="text-xl font-bold text-green-800 font-clash">Congratulations!</h3>
                    </div>
                    <p className="text-green-700 font-epilogue leading-relaxed">
                      Your application has been submitted successfully. The hiring team will review your application and get back to you soon. Good luck!
                    </p>
                  </div>
                )}
                {err && (
                  <div className="alert alert-error mb-4 font-epilogue">{err}</div>
                )}

                <form className="space-y-4" onSubmit={submit}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                      Full Name
                    </label>
                    <input
                      className="input input-bordered w-full font-epilogue"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                      Email Address
                    </label>
                    <input
                      className="input input-bordered w-full font-epilogue"
                      placeholder="john@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                      Resume Link
                    </label>
                    <input
                      className="input input-bordered w-full font-epilogue"
                      placeholder="https://drive.google.com/..."
                      value={form.resumeLink}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, resumeLink: e.target.value }))
                      }
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1 font-epilogue">
                      Google Drive, Dropbox, or any public link
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                      Cover Note (Optional)
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full font-epilogue"
                      placeholder="Tell us why you're a great fit..."
                      rows={4}
                      value={form.coverNote}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, coverNote: e.target.value }))
                      }
                    />
                  </div>

                  <button
                    className={`btn bg-[#4640DE] hover:bg-[#3730a3] text-white w-full font-semibold font-epilogue border-none ${submitting ? "btn-disabled" : ""}`}
                    type="submit"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default JobDetails;
