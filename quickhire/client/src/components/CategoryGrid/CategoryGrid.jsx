import CategoryCard from "../CategoryCard/CategoryCard.jsx";

const categories = [
  { title: "Design", jobs: 235, icon: "fa-solid fa-pen-ruler" },
  { title: "Sales", jobs: 756, icon: "fa-solid fa-chart-line" },
  { title: "Marketing", jobs: 140, icon: "fa-solid fa-bullhorn" },
  { title: "Finance", jobs: 325, icon: "fa-solid fa-coins" },
  { title: "Technology", jobs: 436, icon: "fa-solid fa-laptop-code" },
  { title: "Engineering", jobs: 542, icon: "fa-solid fa-gears" },
  { title: "Business", jobs: 211, icon: "fa-solid fa-briefcase" },
  { title: "Human Resources", jobs: 346, icon: "fa-solid fa-users" },
];

function CategoryGrid({ activeCategory = "", onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.title}
          title={cat.title}
          jobs={cat.jobs}
          icon={cat.icon}
          active={activeCategory === cat.title}
          onClick={() => onSelect?.(cat.title)}
        />
      ))}
    </div>
  );
}

export default CategoryGrid;
