import FeaturedJob from "../FeaturedJob/FeaturedJob.jsx";

function FeaturedJobs() {
  const featuredJobs = [
    {
      id: 1,
      company: "Revolut",
      title: "Email Marketing",
      location: "Madrid, Spain",
      type: "Full Time",
      description: "Revolut is looking for Email Marketing to help team ma ...",
      logo: "",
      tags: [
        {
          label: "Marketing",
          className: "bg-[#FFF4E5] text-[#FFB836]",
        },
        {
          label: "Design",
          className: "bg-[#E7F6EF] text-[#56CDAD]",
        },
      ],
    },
    {
      id: 2,
      company: "Dropbox",
      title: "Brand Designer",
      location: "San Fransisco, US",
      type: "Full Time",
      description:
        "Dropbox is looking for Brand Designer to help the team t ...",
      logo: "",
      tags: [
        {
          label: "Design",
          className: "bg-[#E7F6EF] text-[#56CDAD]",
        },
        {
          label: "Business",
          className: "bg-[#ECE8FF] text-[#635BFF]",
        },
      ],
    },
    {
      id: 3,
      company: "Pitch",
      title: "Email Marketing",
      location: "Berlin, Germany",
      type: "Full Time",
      description:
        "Pitch is looking for Customer Manager to join marketing t ...",
      logo: "",
      tags: [
        {
          label: "Marketing",
          className: "bg-[#FFF4E5] text-[#FFB836]",
        },
      ],
    },
    {
      id: 4,
      company: "Blinklist",
      title: "Visual Designer",
      location: "Granada, Spain",
      type: "Full Time",
      description:
        "Blinkist is looking for Visual Designer to help team desi ...",
      logo: "",
      tags: [
        {
          label: "Design",
          className: "bg-[#E7F6EF] text-[#56CDAD]",
        },
      ],
    },
    {
      id: 5,
      company: "ClassPass",
      title: "Product Designer",
      location: "Manchester, UK",
      type: "Full Time",
      description: "ClassPass is looking for Product Designer to help us...",
      logo: "",
      tags: [
        {
          label: "Marketing",
          className: "bg-[#FFF4E5] text-[#FFB836]",
        },
        {
          label: "Design",
          className: "bg-[#E7F6EF] text-[#56CDAD]",
        },
      ],
    },
    {
      id: 6,
      company: "Canva",
      title: "Lead Designer",
      location: "Ontario, Canada",
      type: "Full Time",
      description: "Canva is looking for Lead Engineer to help develop n ...",
      logo: "",
      tags: [
        {
          label: "Design",
          className: "bg-[#E7F6EF] text-[#56CDAD]",
        },
        {
          label: "Business",
          className: "bg-[#ECE8FF] text-[#635BFF]",
        },
      ],
    },
    {
      id: 7,
      company: "GoDaddy",
      title: "Brand Strategist",
      location: "Marseille, France",
      type: "Full Time",
      description:
        "GoDaddy is looking for Brand Strategist to join the team...",
      logo: "",
      tags: [
        {
          label: "Marketing",
          className: "bg-[#FFF4E5] text-[#FFB836]",
        },
      ],
    },
    {
      id: 8,
      company: "Twitter",
      title: "Data Analyst",
      location: "San Diego, US",
      type: "Full Time",
      description: "Twitter is looking for Data Analyst to help team desi ...",
      logo: "",
      tags: [
        {
          label: "Technology",
          className: "bg-[#FFE9E4] text-[#FF6550]",
        },
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="text-[40px] font-semibold leading-none text-[#25324B]">
          Featured<span className="text-[#26A4FF]">Jobs</span>
        </h2>

        <button className="text-[#4640DE] font-medium text-sm flex items-center gap-2">
          Show all jobs
          <span>→</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {featuredJobs.map((job) => (
          <FeaturedJobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedJobs;
