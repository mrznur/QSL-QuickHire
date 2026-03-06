import { Link } from "react-router-dom";

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

function FeaturedJob({ job }) {
  return (
    <Link to={`/jobs/${job._id}`} className="bg-white border border-[#E5E7EB] rounded-lg p-5 min-h-[185px] flex flex-col justify-between hover:shadow-md transition font-epilogue">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden border border-gray-200">
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-[75%] h-[75%]"
              />
            ) : (
              <span className="text-lg font-semibold text-gray-700">
                {job.company?.charAt(0)}
              </span>
            )}
          </div>

          <span className="text-xs border-2 border-[#FFB836] text-[#FFB836] bg-[#FFF4E5] px-3 py-1 rounded-sm font-semibold">
            {job.type || job.jobType}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-bold text-[#25324B]">
          {job.title}
        </h3>

        <p className="mt-3 text-sm text-[#515B6F]">
          {job.company} • {job.location}
        </p>

        <p className="mt-5 text-sm leading-6 text-[#7C8493]">
          {job.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {job.tags?.map((tag) => (
          <span
            key={tag.label}
            className={`text-xs px-3 py-1 rounded-full font-medium ${tag.className}`}
          >
            {tag.label}
          </span>
        ))}
        {!job.tags && (
          <>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(job.category)}`}>
              {job.category}
            </span>
            {job.salaryRange && (
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-green-50 text-green-700">
                {job.salaryRange}
              </span>
            )}
          </>
        )}
      </div>
    </Link>
  );
}

export default FeaturedJob;
