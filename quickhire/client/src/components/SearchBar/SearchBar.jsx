import { useState } from "react";

function SearchBar({ initial = {}, onSearch }) {
  const [search, setSearch] = useState(initial.search || "");
  const [location, setLocation] = useState(initial.location || "");

  return (
    <div className="bg-base-100 shadow-lg rounded-md p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-6 flex justify-center items-center gap-2">
          <i className="fa-brands fa-sistrix text-lg"></i>
          <input
            className="input input-bordered w-full text-lg"
            placeholder="Job title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="md:col-span-4 flex justify-center items-center gap-2">
          <i className="fa-solid fa-location-dot"></i>
          <input
            className="input input-bordered w-full text-lg"
            placeholder="Location (e.g., Dhaka)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-center">
          <button
            className="btn w-full lg:w-36 h-12 font-semibold text-lg bg-[#4640DE] text-white hover:bg-[#100d4d]"
            onClick={() => onSearch?.({ search, location })}
          >
            Search My Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
