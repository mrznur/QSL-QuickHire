import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { getJobs } from "../../api/api.js";
import { logoMap } from "../../utils/logoMap.js";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = isMobile ? 12 : 24;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      setError("");
      try {
        const jobs = await getJobs();
        
        // Group jobs by company
        const companyMap = {};
        jobs.forEach(job => {
          if (!companyMap[job.company]) {
            companyMap[job.company] = {
              name: job.company,
              logo: logoMap[job.company],
              jobs: [],
              locations: new Set(),
              categories: new Set()
            };
          }
          companyMap[job.company].jobs.push(job);
          companyMap[job.company].locations.add(job.location);
          companyMap[job.company].categories.add(job.category);
        });

        // Convert to array and sort by job count
        const companiesArray = Object.values(companyMap)
          .map(company => ({
            ...company,
            locations: Array.from(company.locations),
            categories: Array.from(company.categories),
            jobCount: company.jobs.length
          }))
          .sort((a, b) => b.jobCount - a.jobCount);

        setCompanies(companiesArray);
      } catch (err) {
        setError(err.message || "Failed to load companies");
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  // Filter companies by search term
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-8 md:px-12 lg:px-16 py-10">
        <h1 className="text-4xl font-bold font-clash mb-2">Browse Companies</h1>
        <p className="text-lg text-gray-600 font-epilogue">
          Discover companies hiring on QuickHire
        </p>

        {/* Search */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <input
            type="text"
            placeholder="Search companies..."
            className="input input-bordered w-full font-epilogue"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-[#4640DE]" />
          </div>
        ) : error ? (
          <div className="alert alert-error mt-8 font-epilogue">{error}</div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-epilogue">
              No companies found matching "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-base text-gray-600 mb-6 font-epilogue">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length} companies
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCompanies.map((company) => (
                <Link
                  key={company.name}
                  to={`/jobs?search=${encodeURIComponent(company.name)}`}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 animate-fadeInUp"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-200">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-[75%] h-[75%] object-contain"
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=4640DE&color=fff&size=64`}
                          alt={company.name}
                          className="w-16 h-16 rounded-lg"
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold font-epilogue text-gray-900">
                        {company.name}
                      </h3>
                      <p className="text-[#4640DE] font-epilogue mt-1 font-semibold">
                        {company.jobCount} open position{company.jobCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {company.categories.slice(0, 3).map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-[#4640DE] bg-opacity-10 text-[#4640DE] rounded-full text-xs font-epilogue"
                        >
                          {category}
                        </span>
                      ))}
                      {company.categories.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-epilogue">
                          +{company.categories.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 font-epilogue">
                      <i className="fas fa-map-marker-alt text-gray-400"></i>
                      <span className="line-clamp-1">
                        {company.locations.slice(0, 2).join(', ')}
                        {company.locations.length > 2 && ` +${company.locations.length - 2}`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[#4640DE] font-epilogue text-sm font-semibold">
                      View Jobs
                    </span>
                    <i className="fas fa-arrow-right text-[#4640DE]"></i>
                  </div>
                </Link>
              ))}
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

export default Companies;
