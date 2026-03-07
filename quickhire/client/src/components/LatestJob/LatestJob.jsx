import { Link } from "react-router-dom";

function getCategoryColor(category) {
  const colors = {
    'Marketing': 'bg-[#FFF4E5] text-[#FFB836]',
    'Design': 'bg-[#F1EFFE] text-[#4640DE]',
    'Sales': 'bg-[#F1EFFE] text-[#4640DE]',
    'Finance': 'bg-[#F1EFFE] text-[#4640DE]',
    'Development': 'bg-[#F1EFFE] text-[#4640DE]',
    'Operations': 'bg-[#F1EFFE] text-[#4640DE]',
  };
  return colors[category] || 'bg-[#F1EFFE] text-[#4640DE]';
}

function LatestJob({ job, delay = 0 }) {
  return (
    <Link to={`/jobs/${job._id}`} className={`bg-white px-6 py-5 border border-[#E9EBFD] rounded-lg flex items-center gap-4 hover:shadow-md transition font-epilogue animate-fadeInUp delay-${delay}`}>
      <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
        {job.logo ? (
          <img
            src={job.logo}
            alt={job.company}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold text-[#4640DE]">
            {job.company?.charAt(0)}
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-[#25324B]">
          {job.title}
        </h3>

        <p className="mt-2 text-sm text-[#515B6F]">
          {job.company} • {job.location}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
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
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-[#E7F6EF] text-[#56CDAD]">
                {job.jobType}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(job.category)}`}>
                {job.category}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default LatestJob;
