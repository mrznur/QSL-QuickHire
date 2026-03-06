import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import JobList from "../../components/JobList/JobList.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CompanyLogos from "../../components/CompanyLogos/CompanyLogos.jsx";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid.jsx";
import Banner from "../../components/Banner/Banner.jsx";

import { getJobs } from "../../api/api.js";
import LinePicture from "../../assets/Group.png";
import Pattern from "../../assets/Pattern.png";
import Person from "../../assets/person.png";

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
    () =>
      "Great platform for the job seeker that searching for new career heights and passionate about startups.",
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
      <section className="container mx-auto px-8 md:px-12 lg:px-16 pt-10 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center relative">
          <div className="z-10">
            <h1 className="text-5xl md:text-7xl font-bold mt-2 leading-tight font-clash">
              Discover <br />
              more than <br />
              <span className="text-[#26A4FF]">5000+</span>{" "}
              <span className="text-[#26A4FF]">Jobs</span>
            </h1>
            <p>
              <img className="w-56 lg:w-96 mt-2" src={LinePicture} alt="" />
            </p>
            <p className="opacity-80 mt-4 w-56 lg:w-96 text-gray-600">
              {subtitle}
            </p>
          </div>

          <div className="relative">
            <div className="card bg-base-100">
              <div className="card-body relative overflow-hidden">
                <img
                  src={Pattern}
                  alt=""
                  className="w-full h-auto scale-110 lg:scale-125"
                />
                <img
                  src={Person}
                  alt=""
                  className="ml-36 mt-8 absolute inset-0 w-full h-full object-contain scale-100 hidden lg:block"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 75%, 40% 100%, 0 100%)",
                  }}
                />
              </div>
            </div>

            {/* Mobile SearchBar Overlay */}
            <div className="lg:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-20 w-full px-4">
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

          {/* Desktop SearchBar Overlay */}
          <div className="hidden lg:block lg:absolute lg:bottom-0 lg:left-[45%] lg:-translate-x-1/2 z-20 max-w-4xl w-full px-8">
            <SearchBar
              initial={filters}
              onSearch={(v) => {
                const next = { ...filters, ...v };
                setFilters(next);
                load(next);
              }}
            />
            <p className="text-sm text-gray-600 mt-2 opacity-75">
              Popular : UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          {/* Mobile Popular Line */}
          <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-full px-4">
            <span className="text-sm text-gray-500 mt-3 opacity-75">
              Popular : <br /> UI Designer, UX Researcher, Android, Admin
            </span>
          </div>
        </div>

        <CompanyLogos />

        {/* Category */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl lg:text-5xl font-bold font-clash">
              Explore by <span className="text-[#26A4FF]">category</span>
            </h2>
            <button
              className="hidden md:flex text-[#4640DE] font-semibold items-center gap-2 hover:underline"
              onClick={() => setFilters((p) => ({ ...p, category: "" }))}
            >
              Show All Jobs <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <CategoryGrid
            activeCategory={filters.category}
            onSelect={(category) =>
              setFilters((prev) => ({
                ...prev,
                category: prev.category === category ? "" : category,
              }))
            }
          />

          <button
            className="md:hidden mt-4 w-full text-[#4640DE] font-semibold flex items-center justify-center gap-2 hover:underline"
            onClick={() => setFilters((p) => ({ ...p, category: "" }))}
          >
            Show All Jobs <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>

      </section>
      <Banner />
      <section className="container mx-auto px-8 md:px-12 lg:px-16 pb-8">
        {/* Jobs */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold font-clash">Latest jobs open</h2>
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
