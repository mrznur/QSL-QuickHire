import { createContext, useEffect, useState } from "react";
import { getJobs } from "../api/api";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <JobsContext.Provider value={{ jobs, loading, error }}>
      {children}
    </JobsContext.Provider>
  );
}

export default JobsContext;
