function CategoryCard({ title, jobs, icon, onClick, delay = 0 }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-2 rounded-md p-5 transition-all flex flex-col justify-between h-full group font-epilogue bg-white hover:bg-[#4640DE] hover:text-white hover:border-[#4640DE] animate-fadeInUp delay-${delay}`}
    >
      <div>
        <div className="text-3xl mb-4 text-[#4640DE] group-hover:text-white">
          <i className={icon}></i>
        </div>
        <h3 className="font-semibold text-xl font-clash">{title}</h3>
      </div>

      <div className="mt-4">
        <span className="text-sm flex items-center gap-1 opacity-75">
          {jobs} Jobs Available <i className="fa-solid fa-arrow-right"></i>
        </span>
      </div>
    </div>
  );
}

export default CategoryCard;
