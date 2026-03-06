function FeaturedJob({ job }) {
  return (
    <div className="bg-white border border-[#E5E7EB] p-5 min-h-[185px] flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white overflow-hidden border border-gray-100">
            {job.logo ? (
              <img
                src={job.logo}
                alt={job.company}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-sm font-semibold text-gray-700">
                {job.company?.charAt(0)}
              </span>
            )}
          </div>

          <span className="text-xs border border-[#635BFF] text-[#635BFF] px-3 py-1 rounded-sm font-medium">
            {job.type}
          </span>
        </div>

        <h3 className="mt-5 text-[22px] leading-none font-semibold text-[#25324B]">
          {job.title}
        </h3>

        <p className="mt-3 text-sm text-[#515B6F]">
          {job.company} • {job.location}
        </p>

        <p className="mt-5 text-sm leading-7 text-[#7C8493]">
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
      </div>
    </div>
  );
}

export default FeaturedJob;
