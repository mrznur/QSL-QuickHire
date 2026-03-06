import vodafone from "../../assets/vodafone-2017-logo.png";
import intel from "../../assets/intel-3.png";
import tesla from "../../assets/tesla-9.png";
import amd from "../../assets/amd-logo-1.png";
import talkit from "../../assets/talkit.png";

function CompanyLogos() {
  return (
    <div className="w-full bg-gray-100 py-8 mt-10">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 text-start">
        <p className="text-gray-500 mb-6 opacity-75 font-epilogue">Companies we helped grow</p>

        <div className="flex flex-wrap items-center justify-start md:justify-between gap-10 md:gap-10 opacity-70">
          <img src={vodafone} alt="Vodafone" className="h-6 md:h-8 object-contain" />
          <img src={intel} alt="Intel" className="h-6 md:h-8 object-contain" />
          <img src={amd} alt="AMD" className="h-6 md:h-8 object-contain" />
          <img src={talkit} alt="Talkit" className="h-6 md:h-8 object-contain" />
          <img src={tesla} alt="Tesla" className="h-6 md:h-8 object-contain" />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogos;
