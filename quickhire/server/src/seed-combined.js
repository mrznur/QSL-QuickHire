import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();

// Original 36 jobs (featured + latest + additional)
const originalJobs = [
  // Featured Jobs (8)
  { title: "Email Marketing", company: "Revolut", location: "Madrid, Spain", category: "Marketing", jobType: "Full-time", salaryRange: "$70k - $100k", description: "Revolut is looking for Email Marketing to help team manage campaigns and drive user engagement through effective email strategies." },
  { title: "Brand Designer", company: "Dropbox", location: "San Francisco, US", category: "Design", jobType: "Full-time", salaryRange: "$90k - $130k", description: "Dropbox is looking for Brand Designer to help the team create amazing designs and maintain brand consistency across all platforms." },
  { title: "Customer Manager", company: "Pitch", location: "Berlin, Germany", category: "Marketing", jobType: "Full-time", salaryRange: "$75k - $110k", description: "Pitch is looking for Customer Manager to join marketing team and drive growth through excellent customer relationships." },
  { title: "Visual Designer", company: "Blinkist", location: "Granada, Spain", category: "Design", jobType: "Full-time", salaryRange: "$65k - $95k", description: "Blinkist is looking for Visual Designer to help team design beautiful interfaces and create engaging visual content." },
  { title: "Product Designer", company: "ClassPass", location: "Manchester, UK", category: "Design", jobType: "Full-time", salaryRange: "$80k - $120k", description: "ClassPass is looking for Product Designer to help us build great products and improve user experience." },
  { title: "Lead Designer", company: "Canva", location: "Ontario, Canada", category: "Design", jobType: "Full-time", salaryRange: "$95k - $140k", description: "Canva is looking for Lead Designer to help develop new features and products while leading the design team." },
  { title: "Brand Strategist", company: "GoDaddy", location: "Marseille, France", category: "Marketing", jobType: "Full-time", salaryRange: "$85k - $125k", description: "GoDaddy is looking for Brand Strategist to join the team and shape our brand identity and marketing strategy." },
  { title: "Data Analyst", company: "Twitter", location: "San Diego, US", category: "Development", jobType: "Full-time", salaryRange: "$90k - $135k", description: "Twitter is looking for Data Analyst to help team analyze and visualize data to drive business decisions." },
  
  // Latest Jobs (8)
  { title: "Social Media Assistant", company: "Nomad", location: "Paris, France", category: "Marketing", jobType: "Full-time", salaryRange: "$50k - $70k", description: "Nomad is seeking a Social Media Assistant to manage social media accounts and create engaging content." },
  { title: "Social Media Manager", company: "Netlify", location: "Paris, France", category: "Marketing", jobType: "Full-time", salaryRange: "$60k - $85k", description: "Netlify is hiring a Social Media Manager to develop social media strategy and grow our online presence." },
  { title: "Brand Designer", company: "Dropbox", location: "San Francisco, USA", category: "Design", jobType: "Full-time", salaryRange: "$90k - $130k", description: "Dropbox is looking for Brand Designer to create visual identities and maintain brand consistency." },
  { title: "Product Designer", company: "Maze", location: "San Francisco, USA", category: "Design", jobType: "Full-time", salaryRange: "$95k - $140k", description: "Maze is seeking a Product Designer to design intuitive user experiences and beautiful interfaces." },
  { title: "Interactive Developer", company: "Terraform", location: "Hamburg, Germany", category: "Development", jobType: "Full-time", salaryRange: "$85k - $120k", description: "Terraform is looking for Interactive Developer to build engaging web experiences and interactive features." },
  { title: "Frontend Developer", company: "Udacity", location: "Hamburg, Germany", category: "Development", jobType: "Full-time", salaryRange: "$80k - $115k", description: "Udacity is hiring a Frontend Developer to create educational platforms and interactive learning experiences." },
  { title: "HR Manager", company: "Packer", location: "Lucern, Switzerland", category: "Operations", jobType: "Full-time", salaryRange: "$75k - $110k", description: "Packer is looking for HR Manager to lead talent acquisition and employee relations." },
  { title: "HR Specialist", company: "Webflow", location: "Lucern, Switzerland", category: "Operations", jobType: "Full-time", salaryRange: "$70k - $100k", description: "Webflow is seeking an HR Specialist to support recruitment and employee development initiatives." },
  
  // Additional 20 jobs
  { title: "Senior Frontend Developer", company: "Google", location: "Mountain View, CA", category: "Development", jobType: "Full-time", salaryRange: "$120k - $180k", description: "We're looking for a Senior Frontend Developer to join our team and build next-generation web applications using React, TypeScript, and modern web technologies." },
  { title: "Product Manager", company: "Amazon", location: "Seattle, WA", category: "Business", jobType: "Full-time", salaryRange: "$130k - $200k", description: "Amazon is seeking a Product Manager to lead product strategy and execution for our e-commerce platform." },
  { title: "UX Designer", company: "Apple", location: "Cupertino, CA", category: "Design", jobType: "Full-time", salaryRange: "$110k - $160k", description: "Join Apple's design team to create beautiful and intuitive user experiences for our products." },
  { title: "Data Scientist", company: "Microsoft", location: "Redmond, WA", category: "Development", jobType: "Full-time", salaryRange: "$125k - $190k", description: "Microsoft is hiring a Data Scientist to analyze large datasets and build machine learning models." },
  { title: "Marketing Manager", company: "Netflix", location: "Los Angeles, CA", category: "Marketing", jobType: "Full-time", salaryRange: "$100k - $150k", description: "Netflix is looking for a Marketing Manager to develop and execute marketing campaigns for our streaming platform." },
  { title: "Backend Engineer", company: "Stripe", location: "San Francisco, CA", category: "Development", jobType: "Full-time", salaryRange: "$140k - $210k", description: "Stripe is seeking a Backend Engineer to build robust payment infrastructure." },
  { title: "Sales Manager", company: "Salesforce", location: "San Francisco, CA", category: "Sales", jobType: "Full-time", salaryRange: "$90k - $140k + commission", description: "Salesforce is hiring a Sales Manager to lead our enterprise sales team." },
  { title: "DevOps Engineer", company: "Shopify", location: "Ottawa, Canada", category: "Operations", jobType: "Full-time", salaryRange: "$100k - $150k", description: "Shopify is looking for a DevOps Engineer to maintain and scale our infrastructure." },
  { title: "iOS Developer", company: "Spotify", location: "Stockholm, Sweden", category: "Development", jobType: "Full-time", salaryRange: "$95k - $145k", description: "Spotify is seeking an iOS Developer to build amazing mobile experiences." },
  { title: "Content Strategist", company: "LinkedIn", location: "Sunnyvale, CA", category: "Marketing", jobType: "Full-time", salaryRange: "$85k - $130k", description: "LinkedIn is hiring a Content Strategist to develop content strategy and create engaging content." },
  { title: "Financial Analyst", company: "PayPal", location: "San Jose, CA", category: "Finance", jobType: "Full-time", salaryRange: "$80k - $120k", description: "PayPal is looking for a Financial Analyst to analyze financial data and provide insights to leadership." },
  { title: "Product Designer", company: "Airbnb", location: "San Francisco, CA", category: "Design", jobType: "Full-time", salaryRange: "$105k - $155k", description: "Airbnb is seeking a Product Designer to create beautiful and functional designs for our platform." },
  { title: "Cloud Architect", company: "Oracle", location: "Austin, TX", category: "Development", jobType: "Full-time", salaryRange: "$135k - $200k", description: "Oracle is hiring a Cloud Architect to design and implement cloud solutions." },
  { title: "HR Manager", company: "Uber", location: "San Francisco, CA", category: "Operations", jobType: "Full-time", salaryRange: "$90k - $135k", description: "Uber is looking for an HR Manager to lead talent acquisition and employee relations." },
  { title: "Machine Learning Engineer", company: "Tesla", location: "Palo Alto, CA", category: "Development", jobType: "Full-time", salaryRange: "$150k - $220k", description: "Tesla is seeking a Machine Learning Engineer to work on autonomous driving technology." },
  { title: "Brand Designer", company: "Adobe", location: "San Jose, CA", category: "Design", jobType: "Full-time", salaryRange: "$95k - $145k", description: "Adobe is hiring a Brand Designer to create visual identities and brand guidelines." },
  { title: "Customer Success Manager", company: "Zoom", location: "San Jose, CA", category: "Sales", jobType: "Full-time", salaryRange: "$75k - $115k", description: "Zoom is looking for a Customer Success Manager to ensure customer satisfaction and retention." },
  { title: "Security Engineer", company: "Meta", location: "Menlo Park, CA", category: "Development", jobType: "Full-time", salaryRange: "$145k - $215k", description: "Meta is seeking a Security Engineer to protect our infrastructure and user data." },
  { title: "Business Analyst", company: "IBM", location: "New York, NY", category: "Business", jobType: "Full-time", salaryRange: "$85k - $125k", description: "IBM is hiring a Business Analyst to analyze business processes and recommend improvements." },
  { title: "Full Stack Developer", company: "GitHub", location: "Remote", category: "Development", jobType: "Remote", salaryRange: "$110k - $170k", description: "GitHub is looking for a Full Stack Developer to build features for our platform." }
];

// Generate 200 additional jobs
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

    await Job.deleteMany({});
    console.log("Cleared existing jobs");

    const additionalJobs = generateAdditionalJobs();
    const allJobs = [...originalJobs, ...additionalJobs];

    await Job.insertMany(allJobs);

    console.log(`Inserted ${allJobs.length} jobs total`);
    console.log(`- ${originalJobs.length} original jobs (featured + latest)`);
    console.log(`- ${additionalJobs.length} additional generated jobs`);
    console.log("Database seeded successfully!");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
