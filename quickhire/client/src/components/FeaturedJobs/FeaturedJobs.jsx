import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedJob from "../FeaturedJob/FeaturedJob.jsx";
import { getJobs } from "../../api/api.js";
import { logoMap } from "../../utils/logoMap.js";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs();
        // Get first 8 jobs and add logos
        const jobsWithLogos = data.slice(0, 8).map(job => ({
          ...job,
          logo: logoMap[job.company],
          type: job.jobType,
        }));
        setJobs(jobsWithLogos);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-8 md:px-12 lg:px-16 py-14">
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-[#4640DE]" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-8 md:px-12 lg:px-16 py-14">
        <div className="alert alert-error">
          <span className="font-epilogue">Error loading featured jobs: {error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-8 md:px-12 lg:px-16 py-14">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-clash">
          Featured <span className="text-[#26A4FF]">Jobs</span>
        </h2>

        <Link to="/jobs" className="hidden md:flex text-[#4640DE] font-semibold items-center gap-2 hover:underline font-epilogue">
          Show all jobs
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <FeaturedJob key={job._id} job={job} />
        ))}
      </div>

      <Link to="/jobs" className="md:hidden mt-6 w-full text-[#4640DE] font-semibold flex items-center justify-center gap-2 hover:underline font-epilogue">
        Show all jobs
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </section>
  );
}

export default FeaturedJobs;
