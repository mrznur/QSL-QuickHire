import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="card bg-base-100 border hover:shadow-md transition">
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="card-title text-lg">{job.title}</h3>
            <p className="opacity-80">{job.company}</p>
          </div>

          <div className="badge badge-outline">{job.jobType}</div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="badge badge-ghost">{job.category}</span>
          <span className="badge badge-ghost">{job.location}</span>
          {job.salaryRange ? (
            <span className="badge badge-ghost">{job.salaryRange}</span>
          ) : null}
        </div>

        <div className="card-actions justify-end mt-3">
          <Link to={`/jobs/${job._id}`} className="btn btn-sm btn-outline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
