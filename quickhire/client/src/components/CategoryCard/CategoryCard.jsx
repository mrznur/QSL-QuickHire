function CategoryCard({ title, jobs, icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-2 rounded-md p-5 transition-all flex flex-col justify-between h-full group
      ${
        active
          ? "bg-[#4640DE] text-white border-[#4640DE]"
          : "bg-white hover:bg-[#4640DE] hover:text-white hover:border-[#4640DE]"
      }`}
    >
      <div>
        <div
          className={`text-3xl mb-4 ${active ? "text-white" : "text-[#4640DE] group-hover:text-white"}`}
        >
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
