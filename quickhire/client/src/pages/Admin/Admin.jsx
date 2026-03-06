import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { createJob, deleteJob, getJobs, getApplications, deleteApplication } from "../../api/api.js";
import { logoMap } from "../../utils/logoMap.js";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("jobs"); // "jobs" or "applications"
  
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
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

  // Check if already logged in
  useEffect(() => {
    const storedKey = sessionStorage.getItem("adminKey");
    if (storedKey) {
      setAdminKey(storedKey);
      setIsAuthenticated(true);
    }
  }, []);

  async function refresh() {
    setLoading(true);
    setErr("");
    try {
      const data = await getJobs();
      setJobs(data);
      
      // Try to fetch applications, but don't fail if it errors
      try {
        const appsData = await getApplications();
        setApplications(appsData);
      } catch (appErr) {
        console.error("Failed to load applications:", appErr);
        setApplications([]);
      }
    } catch (e) {
      setErr(e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      refresh();
    }
  }, [isAuthenticated]);

  function handleLogin(e) {
    e.preventDefault();
    setLoginError("");

    // Simple validation - check if key matches the one in .env
    const expectedKey = import.meta.env.VITE_ADMIN_KEY;
    
    if (adminKey === expectedKey) {
      sessionStorage.setItem("adminKey", adminKey);
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid admin key. Please try again.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("adminKey");
    setIsAuthenticated(false);
    setAdminKey("");
  }

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      await createJob(form);
      setMsg("Job created successfully!");
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
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    setMsg("");
    setErr("");
    try {
      await deleteJob(id);
      setMsg("Job deleted successfully!");
      refresh();
    } catch (e) {
      setErr(e.message || "Failed to delete job (check admin key)");
    }
  }

  async function removeApplication(id) {
    if (!confirm("Are you sure you want to delete this application?")) return;
    
    setMsg("");
    setErr("");
    try {
      await deleteApplication(id);
      setMsg("Application deleted successfully!");
      refresh();
    } catch (e) {
      setErr(e.message || "Failed to delete application");
    }
  }

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container mx-auto px-8 md:px-12 lg:px-16 py-20">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#4640DE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lock text-white text-2xl"></i>
                </div>
                <h1 className="text-3xl font-bold font-clash">Admin Login</h1>
                <p className="text-gray-600 font-epilogue mt-2">
                  Enter your admin key to access the dashboard
                </p>
              </div>

              {loginError && (
                <div className="alert alert-error mb-6 font-epilogue">
                  <i className="fas fa-exclamation-circle"></i>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                    Admin Key
                  </label>
                  <input
                    type="password"
                    className="input input-bordered w-full font-epilogue"
                    placeholder="Enter your admin key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn bg-[#4640DE] hover:bg-[#3730a3] text-white w-full font-semibold font-epilogue border-none"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Login
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-6 text-center font-epilogue">
                Contact your system administrator if you don't have access
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // Admin Dashboard (after login)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-8 md:px-12 lg:px-16 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold font-clash">Admin Dashboard</h1>
            <p className="lg:text-lg text-gray-600 font-epilogue mt-2">
              Manage job listings and applications
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline font-epilogue"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            className={`px-6 py-3 font-semibold font-epilogue transition-colors ${
              activeTab === "jobs"
                ? "text-[#4640DE] border-b-2 border-[#4640DE]"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("jobs")}
          >
            <i className="fas fa-briefcase mr-2"></i>
            Jobs ({jobs.length})
          </button>
          <button
            className={`px-6 py-3 font-semibold font-epilogue transition-colors ${
              activeTab === "applications"
                ? "text-[#4640DE] border-b-2 border-[#4640DE]"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            <i className="fas fa-file-alt mr-2"></i>
            Applications ({applications.length})
          </button>
        </div>

        {msg && (
          <div className="alert alert-success mt-6 font-epilogue">{msg}</div>
        )}
        {err && (
          <div className="alert alert-error mt-6 font-epilogue">{err}</div>
        )}

        {activeTab === "jobs" ? (
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold font-clash mb-6">Add New Job</h2>

            <form className="space-y-4" onSubmit={submit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                  Job Title
                </label>
                <input
                  className="input input-bordered w-full font-epilogue"
                  placeholder="e.g. Senior Frontend Developer"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                  Company Name
                </label>
                <input
                  className="input input-bordered w-full font-epilogue"
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, company: e.target.value }))
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                  Location
                </label>
                <input
                  className="input input-bordered w-full font-epilogue"
                  placeholder="e.g. San Francisco, CA"
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                    Category
                  </label>
                  <select
                    className="select select-bordered w-full font-epilogue"
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
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                    Job Type
                  </label>
                  <select
                    className="select select-bordered w-full font-epilogue"
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                  Salary Range (Optional)
                </label>
                <input
                  className="input input-bordered w-full font-epilogue"
                  placeholder="e.g. $80k - $120k"
                  value={form.salaryRange}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, salaryRange: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                  Job Description
                </label>
                <textarea
                  className="textarea textarea-bordered w-full font-epilogue"
                  rows={6}
                  placeholder="Describe the role, responsibilities, requirements..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                />
              </div>

              <button
                className="btn bg-[#4640DE] hover:bg-[#3730a3] text-white w-full font-semibold font-epilogue border-none"
                type="submit"
              >
                Create Job Listing
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-clash">All Jobs ({jobs.length})</h2>
              <button
                className="btn btn-outline btn-sm font-epilogue"
                onClick={refresh}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-[#4640DE]" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 font-epilogue">No jobs yet. Create your first job listing!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {jobs.map((j) => {
                  const companyLogo = logoMap[j.company];
                  
                  return (
                    <div
                      key={j._id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-[#4640DE] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-200">
                            {companyLogo ? (
                              <img
                                src={companyLogo}
                                alt={j.company}
                                className="w-[75%] h-[75%] object-contain"
                              />
                            ) : (
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(j.company)}&background=4640DE&color=fff&size=48`}
                                alt={j.company}
                                className="w-12 h-12 rounded-lg"
                              />
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 font-epilogue">
                              {j.title}
                            </h3>
                            <p className="text-sm text-gray-600 font-epilogue mt-1">
                              {j.company} • {j.location}
                            </p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-epilogue">
                                {j.category}
                              </span>
                              <span className="px-2 py-1 border border-[#FFB836] text-[#FFB836] bg-[#FFF4E5] rounded text-xs font-epilogue">
                                {j.jobType}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-error btn-sm font-epilogue"
                          onClick={() => remove(j._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-clash">All Applications ({applications.length})</h2>
              <button
                className="btn btn-outline btn-sm font-epilogue"
                onClick={refresh}
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-[#4640DE]" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-20">
                <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 font-epilogue">No applications yet.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[700px] overflow-y-auto">
                {applications.map((app) => (
                  <div
                    key={app._id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-[#4640DE] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 font-epilogue">
                          {app.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-epilogue mt-1">
                          <i className="fas fa-envelope mr-2"></i>
                          {app.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-epilogue">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          className="btn btn-error btn-sm font-epilogue"
                          onClick={() => removeApplication(app._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    {app.jobId && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm font-semibold text-gray-700 font-epilogue">
                          Applied for: {app.jobId.title}
                        </p>
                        <p className="text-xs text-gray-600 font-epilogue mt-1">
                          {app.jobId.company} • {app.jobId.location}
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 font-epilogue">
                          Resume:
                        </p>
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#4640DE] hover:underline font-epilogue flex items-center gap-2"
                        >
                          <i className="fas fa-external-link-alt"></i>
                          View Resume
                        </a>
                      </div>

                      {app.coverNote && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 font-epilogue mb-1">
                            Cover Note:
                          </p>
                          <p className="text-sm text-gray-600 font-epilogue bg-gray-50 p-3 rounded">
                            {app.coverNote}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
