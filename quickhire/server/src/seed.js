import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();

const sampleJobs = [
  // Featured Jobs (with logos)
  {
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    category: "Marketing",
    jobType: "Full-time",
    salaryRange: "$70k - $100k",
    description: "Revolut is looking for Email Marketing to help team manage campaigns and drive user engagement through effective email strategies.",
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$90k - $130k",
    description: "Dropbox is looking for Brand Designer to help the team create amazing designs and maintain brand consistency across all platforms.",
  },
  {
    title: "Customer Manager",
    company: "Pitch",
    location: "Berlin, Germany",
    category: "Marketing",
    jobType: "Full-time",
    salaryRange: "$75k - $110k",
    description: "Pitch is looking for Customer Manager to join marketing team and drive growth through excellent customer relationships.",
  },
  {
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$65k - $95k",
    description: "Blinkist is looking for Visual Designer to help team design beautiful interfaces and create engaging visual content.",
  },
  {
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$80k - $120k",
    description: "ClassPass is looking for Product Designer to help us build great products and improve user experience.",
  },
  {
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$95k - $140k",
    description: "Canva is looking for Lead Designer to help develop new features and products while leading the design team.",
  },
  {
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    category: "Marketing",
    jobType: "Full-time",
    salaryRange: "$85k - $125k",
    description: "GoDaddy is looking for Brand Strategist to join the team and shape our brand identity and marketing strategy.",
  },
  {
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$90k - $135k",
    description: "Twitter is looking for Data Analyst to help team analyze and visualize data to drive business decisions.",
  },
  // Latest Jobs (with logos)
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    category: "Marketing",
    jobType: "Full-time",
    salaryRange: "$50k - $70k",
    description: "Nomad is seeking a Social Media Assistant to manage social media accounts and create engaging content.",
  },
  {
    title: "Social Media Manager",
    company: "Netlify",
    location: "Paris, France",
    category: "Marketing",
    jobType: "Full-time",
    salaryRange: "$60k - $85k",
    description: "Netlify is hiring a Social Media Manager to develop social media strategy and grow our online presence.",
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$90k - $130k",
    description: "Dropbox is looking for Brand Designer to create visual identities and maintain brand consistency.",
  },
  {
    title: "Product Designer",
    company: "Maze",
    location: "San Francisco, USA",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$95k - $140k",
    description: "Maze is seeking a Product Designer to design intuitive user experiences and beautiful interfaces.",
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$85k - $120k",
    description: "Terraform is looking for Interactive Developer to build engaging web experiences and interactive features.",
  },
  {
    title: "Frontend Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$80k - $115k",
    description: "Udacity is hiring a Frontend Developer to create educational platforms and interactive learning experiences.",
  },
  {
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    category: "Operations",
    jobType: "Full-time",
    salaryRange: "$75k - $110k",
    description: "Packer is looking for HR Manager to lead talent acquisition and employee relations.",
  },
  {
    title: "HR Specialist",
    company: "Webflow",
    location: "Lucern, Switzerland",
    category: "Operations",
    jobType: "Full-time",
    salaryRange: "$70k - $100k",
    description: "Webflow is seeking an HR Specialist to support recruitment and employee development initiatives.",
  },
  // Additional Database Jobs
  {
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Mountain View, CA",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$120k - $180k",
    description: "We're looking for a Senior Frontend Developer to join our team and build next-generation web applications using React, TypeScript, and modern web technologies. You'll work on products used by millions of users worldwide.",
  },
  {
    title: "Product Manager",
    company: "Amazon",
    location: "Seattle, WA",
    category: "Business",
    jobType: "Full-time",
    salaryRange: "$130k - $200k",
    description: "Amazon is seeking a Product Manager to lead product strategy and execution for our e-commerce platform. You'll work with cross-functional teams to define product roadmaps and deliver innovative solutions.",
  },
  {
    title: "UX Designer",
    company: "Apple",
    location: "Cupertino, CA",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$110k - $160k",
    description: "Join Apple's design team to create beautiful and intuitive user experiences for our products. You'll collaborate with engineers and product managers to design interfaces that delight millions of users.",
  },
  {
    title: "Data Scientist",
    company: "Microsoft",
    location: "Redmond, WA",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$125k - $190k",
    description: "Microsoft is hiring a Data Scientist to analyze large datasets and build machine learning models. You'll work on cutting-edge AI projects and help shape the future of technology.",
  },
  {
    title: "Marketing Manager",
    company: "Netflix",
    location: "Los Angeles, CA",
    category: "Marketing",
    jobType: "Full-time",
    salaryRange: "$100k - $150k",
    description: "Netflix is looking for a Marketing Manager to develop and execute marketing campaigns for our streaming platform. You'll work with creative teams to drive user acquisition and engagement.",
  },
  {
    title: "Backend Engineer",
    company: "Stripe",
    location: "San Francisco, CA",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$140k - $210k",
    description: "Stripe is seeking a Backend Engineer to build robust payment infrastructure. You'll work with distributed systems, APIs, and databases to process billions of dollars in transactions.",
  },
  {
    title: "Sales Manager",
    company: "Salesforce",
    location: "San Francisco, CA",
    category: "Sales",
    jobType: "Full-time",
    salaryRange: "$90k - $140k + commission",
    description: "Salesforce is hiring a Sales Manager to lead our enterprise sales team. You'll build relationships with clients, close deals, and drive revenue growth.",
  },
  {
    title: "DevOps Engineer",
    company: "Shopify",
    location: "Ottawa, Canada",
    category: "Operations",
    jobType: "Full-time",
    salaryRange: "$100k - $150k",
    description: "Shopify is looking for a DevOps Engineer to maintain and scale our infrastructure. You'll work with Kubernetes, Docker, and cloud platforms to ensure high availability.",
  },
  {
    title: "iOS Developer",
    company: "Spotify",
    location: "Stockholm, Sweden",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$95k - $145k",
    description: "Spotify is seeking an iOS Developer to build amazing mobile experiences. You'll work with Swift, SwiftUI, and modern iOS technologies to create features used by millions.",
  },
  {
    title: "Content Strategist",
    company: "LinkedIn",
    location: "Sunnyvale, CA",
    category: "Marketing",
    jobType: "Full-time",
    salaryRange: "$85k - $130k",
    description: "LinkedIn is hiring a Content Strategist to develop content strategy and create engaging content for our platform. You'll work with writers, designers, and product teams.",
  },
  {
    title: "Financial Analyst",
    company: "PayPal",
    location: "San Jose, CA",
    category: "Finance",
    jobType: "Full-time",
    salaryRange: "$80k - $120k",
    description: "PayPal is looking for a Financial Analyst to analyze financial data and provide insights to leadership. You'll work with Excel, SQL, and financial modeling tools.",
  },
  {
    title: "Product Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$105k - $155k",
    description: "Airbnb is seeking a Product Designer to create beautiful and functional designs for our platform. You'll work on features that help millions of people find unique places to stay.",
  },
  {
    title: "Cloud Architect",
    company: "Oracle",
    location: "Austin, TX",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$135k - $200k",
    description: "Oracle is hiring a Cloud Architect to design scalable cloud solutions. You'll work with enterprise clients to architect and implement cloud infrastructure.",
  },
  {
    title: "HR Manager",
    company: "Uber",
    location: "San Francisco, CA",
    category: "Operations",
    jobType: "Full-time",
    salaryRange: "$90k - $135k",
    description: "Uber is looking for an HR Manager to lead talent acquisition and employee relations. You'll build a strong company culture and attract top talent.",
  },
  {
    title: "Machine Learning Engineer",
    company: "Tesla",
    location: "Palo Alto, CA",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$150k - $220k",
    description: "Tesla is seeking a Machine Learning Engineer to work on autonomous driving technology. You'll build and train neural networks for computer vision and decision making.",
  },
  {
    title: "Brand Designer",
    company: "Adobe",
    location: "San Jose, CA",
    category: "Design",
    jobType: "Full-time",
    salaryRange: "$95k - $145k",
    description: "Adobe is hiring a Brand Designer to create visual identities and brand guidelines. You'll work with marketing teams to maintain brand consistency across all channels.",
  },
  {
    title: "Customer Success Manager",
    company: "Zoom",
    location: "San Jose, CA",
    category: "Sales",
    jobType: "Full-time",
    salaryRange: "$75k - $115k",
    description: "Zoom is looking for a Customer Success Manager to ensure customer satisfaction and retention. You'll work with enterprise clients to maximize product adoption.",
  },
  {
    title: "Security Engineer",
    company: "Meta",
    location: "Menlo Park, CA",
    category: "Development",
    jobType: "Full-time",
    salaryRange: "$145k - $215k",
    description: "Meta is seeking a Security Engineer to protect our infrastructure and user data. You'll work on security systems, threat detection, and incident response.",
  },
  {
    title: "Business Analyst",
    company: "IBM",
    location: "New York, NY",
    category: "Business",
    jobType: "Full-time",
    salaryRange: "$85k - $125k",
    description: "IBM is hiring a Business Analyst to analyze business processes and recommend improvements. You'll work with stakeholders to gather requirements and deliver solutions.",
  },
  {
    title: "Full Stack Developer",
    company: "GitHub",
    location: "Remote",
    category: "Development",
    jobType: "Remote",
    salaryRange: "$110k - $170k",
    description: "GitHub is looking for a Full Stack Developer to build features for our platform. You'll work with Ruby, JavaScript, and modern web technologies in a remote-first environment.",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing jobs
    await Job.deleteMany({});
    console.log("Cleared existing jobs");

    // Insert jobs in order with timestamps
    // Featured jobs first (oldest timestamps)
    const featuredJobs = sampleJobs.slice(0, 8);
    const latestJobs = sampleJobs.slice(8, 16);
    const otherJobs = sampleJobs.slice(16);

    // Insert featured jobs (will have oldest createdAt)
    for (let i = 0; i < featuredJobs.length; i++) {
      await Job.create(featuredJobs[i]);
      await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
    }

    // Insert latest jobs (will have middle createdAt)
    for (let i = 0; i < latestJobs.length; i++) {
      await Job.create(latestJobs[i]);
      await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
    }

    // Insert other jobs (will have newest createdAt)
    for (let i = 0; i < otherJobs.length; i++) {
      await Job.create(otherJobs[i]);
      await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
    }

    console.log(`Inserted ${sampleJobs.length} sample jobs`);
    console.log("- 8 Featured jobs (with logos)");
    console.log("- 8 Latest jobs (with logos)");
    console.log("- 20 Additional jobs");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
