import { useState } from "react";

export default function SearchBar({ initial = {}, onSearch }) {
  const [search, setSearch] = useState(initial.search || "");
  const [location, setLocation] = useState(initial.location || "");

  return (
    <div className="bg-base-100 shadow rounded-2xl p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-6">
          <input
            className="input input-bordered w-full"
            placeholder="Job title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="md:col-span-4">
          <input
            className="input input-bordered w-full"
            placeholder="Location (e.g., Dhaka)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <button
            className="btn btn-primary w-full"
            onClick={() => onSearch?.({ search, location })}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
