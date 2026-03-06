import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import JobList from "../../components/JobList/JobList.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getJobs } from "../../api/api.js";
import LinePicture from "../../assets/Group.png"

const CATEGORY_OPTIONS = [
  "Development",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
];

export default function Home() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const subtitle = useMemo(
    () => "Great platform for the job seeker that searching for new career heights and passionate about startups.",
    [],
  );

  async function load(nextFilters = filters) {
    setLoading(true);
    setError("");
    try {
      const data = await getJobs(nextFilters);
      setJobs(data);
    } catch (e) {
      setError(e.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category]); // auto refresh on category change

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-10 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mt-2 leading-tight">
              Discover <br />more than <br /><span className="text-[#26A4FF]">5000+</span>{" "}
              <span className="text-[#26A4FF]">Jobs</span>
            </h1>
            <p><img className="w-56 lg:w-96" src={LinePicture} alt="" /></p>
            <p className="opacity-80 mt-4 w-56 lg:w-96 text-gray-600">{subtitle}</p>
            <div className="mt-6">
              <SearchBar
                initial={filters}
                onSearch={(v) => {
                  const next = { ...filters, ...v };
                  setFilters(next);
                  load(next);
                }}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="font-semibold text-lg">Quick tips</h3>
                <ul className="list-disc ml-5 opacity-80 space-y-2 mt-2">
                  <li>Use keywords like “Frontend”, “React”, “Intern”.</li>
                  <li>Filter by category for faster results.</li>
                  <li>Open a job to apply in 1 minute.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Explore by category</h2>
            <select
              className="select select-bordered max-w-xs"
              value={filters.category}
              onChange={(e) =>
                setFilters((p) => ({ ...p, category: e.target.value }))
              }
            >
              <option value="">All categories</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c}
                className={`btn btn-sm ${filters.category === c ? "btn-primary" : "btn-outline"}`}
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    category: p.category === c ? "" : c,
                  }))
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Latest jobs open</h2>
            <button className="btn btn-outline" onClick={() => load(filters)}>
              Refresh
            </button>
          </div>

          <div className="mt-4">
            <JobList jobs={jobs} loading={loading} error={error} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
