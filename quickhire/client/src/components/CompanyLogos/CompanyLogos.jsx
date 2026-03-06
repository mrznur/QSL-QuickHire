import vodafone from "../../assets/vodafone-2017-logo.png";
import intel from "../../assets/intel-3.png";
import tesla from "../../assets/tesla-9.png";
import amd from "../../assets/amd-logo-1.png";
import talkit from "../../assets/talkit.png";

function CompanyLogos() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-start">
        <p className="text-gray-500 mb-6 opacity-75">Companies we helped grow</p>

        <div className="flex flex-wrap items-start justify-between gap-10 opacity-70">
          <img src={vodafone} alt="Vodafone" className="h-8 object-contain" />
          <img src={intel} alt="Intel" className="h-8 object-contain" />
          <img src={amd} alt="AMD" className="h-8 object-contain" />
          <img src={talkit} alt="Talkit" className="h-8 object-contain" />
          <img src={tesla} alt="Tesla" className="h-8 object-contain" />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogos;
