import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();

// Generate 200 additional jobs (without clearing existing)
function generateAdditionalJobs() {
  const titles = {
    Development: ["Senior Frontend Developer", "Backend Engineer", "Full Stack Developer", "DevOps Engineer", "Mobile Developer", "Software Architect", "Cloud Engineer", "Data Engineer", "QA Engineer", "Security Engineer"],
    Design: ["UI/UX Designer", "Product Designer", "Graphic Designer", "Visual Designer", "Brand Designer", "Motion Designer", "Interaction Designer", "Design Lead", "Creative Director", "Art Director"],
    Marketing: ["Marketing Manager", "Content Strategist", "SEO Specialist", "Social Media Manager", "Growth Hacker", "Brand Manager", "Digital Marketing Specialist", "Email Marketing Manager", "Marketing Analyst", "Product Marketing Manager"],
    Sales: ["Sales Manager", "Account Executive", "Business Development Manager", "Sales Representative", "Customer Success Manager", "Sales Engineer", "Regional Sales Director", "Inside Sales Representative", "Enterprise Account Manager", "Sales Operations Manager"],
    Finance: ["Financial Analyst", "Accountant", "Finance Manager", "Investment Analyst", "Tax Specialist", "Budget Analyst", "Treasury Analyst", "Financial Controller", "Risk Analyst", "Compliance Officer"],
    Operations: ["Operations Manager", "Project Manager", "Supply Chain Manager", "Logistics Coordinator", "Operations Analyst", "Process Improvement Manager", "Facilities Manager", "Procurement Specialist", "Quality Assurance Manager", "Operations Director"],
    Business: ["Business Analyst", "Product Manager", "Strategy Consultant", "Management Consultant", "Business Intelligence Analyst", "Program Manager", "Chief of Staff", "Operations Consultant", "Business Development Analyst", "Strategic Planner"]
  };

  const companies = [
    "Atlassian", "Slack", "Docker", "MongoDB", "Redis", "Elastic", "Databricks", "Snowflake", "Twilio", "SendGrid",
    "Mailchimp", "HubSpot", "Zendesk", "Intercom", "Figma", "Notion", "Asana", "Trello", "Monday.com", "ClickUp",
    "Airtable", "Zapier", "Postman", "Vercel", "Netlify", "Cloudflare", "DigitalOcean", "Linode", "Heroku", "Railway",
    "Supabase", "PlanetScale", "Neon", "Render", "Fly.io", "Deno", "Bun", "Vite", "Turbo", "Nx",
    "Prisma", "Drizzle", "tRPC", "Next.js", "Remix", "Astro", "SvelteKit", "Nuxt", "Qwik", "Solid"
  ];

  const locations = [
    "New York, NY", "San Francisco, CA", "Los Angeles, CA", "Chicago, IL", "Boston, MA",
    "Seattle, WA", "Austin, TX", "Denver, CO", "Portland, OR", "Miami, FL",
    "London, UK", "Paris, France", "Berlin, Germany", "Amsterdam, Netherlands", "Barcelona, Spain",
    "Toronto, Canada", "Vancouver, Canada", "Sydney, Australia", "Melbourne, Australia", "Singapore",
    "Tokyo, Japan", "Seoul, South Korea", "Dubai, UAE", "Mumbai, India", "Bangalore, India",
    "Remote", "Hybrid - US", "Hybrid - Europe", "Hybrid - Asia", "Remote - Worldwide"
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];

  const jobs = [];

  for (let i = 0; i < 200; i++) {
    const categories = Object.keys(titles);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const titleOptions = titles[category];
    const title = titleOptions[Math.floor(Math.random() * titleOptions.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    const minSalary = 50 + Math.floor(Math.random() * 150);
    const maxSalary = minSalary + 30 + Math.floor(Math.random() * 50);
    const salaryRange = `$${minSalary}k - $${maxSalary}k`;

    const description = `${company} is seeking a talented ${title} to join our ${category} team. You'll work on exciting projects, collaborate with cross-functional teams, and help drive innovation. We offer competitive compensation, excellent benefits, and opportunities for growth.`;

    jobs.push({ title, company, location, category, jobType, salaryRange, description });
  }

  return jobs;
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existingCount = await Job.countDocuments();
    console.log(`Current jobs in database: ${existingCount}`);

    const additionalJobs = generateAdditionalJobs();
    await Job.insertMany(additionalJobs);

    const newCount = await Job.countDocuments();
    console.log(`Added ${additionalJobs.length} new jobs`);
    console.log(`Total jobs now: ${newCount}`);
    console.log("Database seeded successfully!");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
