import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../CategoryCard/CategoryCard.jsx";
import { getJobs } from "../../api/api.js";

const categories = [
  { title: "Design", icon: "fa-solid fa-pen-ruler" },
  { title: "Sales", icon: "fa-solid fa-chart-line" },
  { title: "Marketing", icon: "fa-solid fa-bullhorn" },
  { title: "Finance", icon: "fa-solid fa-coins" },
  { title: "Development", icon: "fa-solid fa-laptop-code" },
  { title: "Operations", icon: "fa-solid fa-gears" },
];

function CategoryGrid() {
  const navigate = useNavigate();
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryCounts() {
      try {
        const allJobs = await getJobs();
        
        // Count jobs per category
        const counts = {};
        categories.forEach(cat => {
          counts[cat.title] = allJobs.filter(job => job.category === cat.title).length;
        });
        
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Failed to fetch category counts:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategoryCounts();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.title}
          title={cat.title}
          jobs={loading ? "..." : (categoryCounts[cat.title] || 0)}
          icon={cat.icon}
          onClick={() => handleCategoryClick(cat.title)}
        />
      ))}
    </div>
  );
}

export default CategoryGrid;
