import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getJobs } from "../../api/api.js";
import { logoMap } from "../../utils/logoMap.js";

function getCategoryColor(category) {
  const colors = {
    'Marketing': 'bg-[#FFF4E5] text-[#FFB836]',
    'Design': 'bg-[#4640DE] bg-opacity-10 text-[#4640DE]',
    'Sales': 'bg-[#4640DE] bg-opacity-10 text-[#4640DE]',
    'Finance': 'bg-[#4640DE] bg-opacity-10 text-[#4640DE]',
    'Development': 'bg-[#4640DE] bg-opacity-10 text-[#4640DE]',
    'Operations': 'bg-[#4640DE] bg-opacity-10 text-[#4640DE]',
  };
  return colors[category] || 'bg-[#4640DE] bg-opacity-10 text-[#4640DE]';
}

function JobListings() {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // Items per page based on screen size
  const itemsPerPage = isMobile ? 20 : 30;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      setErr("");
      try {
        const data = await getJobs({ search, category, location });
        setJobs(data);
        setCurrentPage(1);
      } catch (e) {
        setErr(e.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, [search, category, location]);

  // Pagination calculations
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-8 md:px-12 lg:px-16 py-10">
        <h1 className="text-4xl font-bold font-clash mb-2">All Jobs</h1>
        <p className="text-lg text-gray-600 font-epilogue">
          Discover your next career opportunity
        </p>

        {/* Search and Filters */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="input input-bordered w-full font-epilogue"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              className="input input-bordered w-full font-epilogue"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select
              className="select select-bordered w-full font-epilogue"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {(search || category || location) && (
            <button
              className="btn btn-ghost btn-sm mt-4 font-epilogue"
              onClick={() => {
                setSearch("");
                setCategory("");
                setLocation("");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Job Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-[#4640DE]" />
          </div>
        ) : err ? (
          <div className="alert alert-error mt-8 font-epilogue">{err}</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-epilogue">
              No jobs found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-base text-gray-600 mb-6 font-epilogue">
              Showing {startIndex + 1}-{Math.min(endIndex, jobs.length)} of {jobs.length} job{jobs.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-1 gap-4">
              {currentJobs.map((job) => {
                const companyLogo = logoMap[job.company];

                return (
                  <Link
                    key={job._id}
                    to={`/jobs/${job._id}`}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4 flex-1">
                        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-200">
                          {companyLogo ? (
                            <img
                              src={companyLogo}
                              alt={job.company}
                              className="w-[75%] h-[75%] object-contain"
                            />
                          ) : (
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4640DE&color=fff&size=56`}
                              alt={job.company}
                              className="w-14 h-14 rounded-lg"
                            />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold font-epilogue text-gray-900">
                                {job.title}
                              </h3>
                              <p className="text-gray-600 font-epilogue mt-1">
                                {job.company}
                              </p>
                            </div>
                            <span className="text-sm text-gray-500 font-epilogue whitespace-nowrap">
                              {new Date(job.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-epilogue">
                              {job.location}
                            </span>
                            <span className="px-3 py-1 border-2 border-[#FFB836] text-[#FFB836] bg-[#FFF4E5] rounded-full text-sm font-epilogue">
                              {job.jobType}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-epilogue ${getCategoryColor(job.category)}`}>
                              {job.category}
                            </span>
                            {job.salaryRange && (
                              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-epilogue">
                                {job.salaryRange}
                              </span>
                            )}
                          </div>

                          <p className="text-gray-600 font-epilogue mt-3 line-clamp-2">
                            {job.description}
                          </p>
                        </div>
                      </div>

                      <i className="fas fa-arrow-right text-[#4640DE] text-xl"></i>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-sm btn-ghost font-epilogue disabled:opacity-30"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`btn btn-sm font-epilogue ${
                        currentPage === page
                          ? 'bg-[#4640DE] text-white hover:bg-[#3730a3]'
                          : 'btn-ghost'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm btn-ghost font-epilogue disabled:opacity-30"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default JobListings;
