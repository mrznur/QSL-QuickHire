import { useMemo } from "react";
import { Link } from "react-router-dom";
import LatestJob from "../LatestJob/LatestJob";
import { logoMap } from "../../utils/logoMap.js";
import { useJobs } from "../../hooks/useJobs.js";

function LatestJobs() {
  const { jobs: allJobs, loading, error } = useJobs();

  const jobs = useMemo(() => {
    return allJobs.slice(8, 16).map(job => ({
      ...job,
      logo: logoMap[job.company],
    }));
  }, [allJobs]);

  if (loading) {
    return (
      <section className="relative container mx-auto px-8 md:px-12 lg:px-16 py-14">
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-[#4640DE]" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative container mx-auto px-8 md:px-12 lg:px-16 py-14">
        <div className="alert alert-error">
          <span className="font-epilogue">Error loading latest jobs: {error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="relative container mx-auto px-8 md:px-12 lg:px-16 py-14">
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-clash">
            Latest <span className="text-[#26A4FF]">Jobs Open</span>
          </h2>

          <Link to="/jobs" className="hidden md:flex text-[#4640DE] font-semibold items-center gap-2 hover:underline font-epilogue">
            Show all jobs
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {jobs.map((job, index) => (
            <LatestJob key={job._id} job={job} delay={100 * (index + 1)} />
          ))}
        </div>

        <Link to="/jobs" className="md:hidden mt-6 w-full text-[#4640DE] font-semibold flex items-center justify-center gap-2 hover:underline font-epilogue">
          Show all jobs
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-72 h-[1px] bg-[#D9D6FE] rotate-[25deg]" />
        <div className="absolute top-20 right-0 w-72 h-[1px] bg-[#D9D6FE] -rotate-[30deg]" />
        <div className="absolute bottom-24 left-1/3 w-72 h-[1px] bg-[#D9D6FE] -rotate-[28deg]" />
        <div className="absolute bottom-10 right-20 w-56 h-[1px] bg-[#D9D6FE] rotate-[25deg]" />
      </div>
    </section>
  );
}

export default LatestJobs;
