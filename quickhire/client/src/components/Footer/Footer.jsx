import Logo from "../../assets/Logo.png";

function Footer() {
  return (
    <footer className="bg-[#1D2140] text-white pt-16 pb-8 font-epilogue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src={Logo} alt="" />
              <h2 className="text-3xl font-semibold font-redhat">QuickHire</h2>
            </div>

            <p className="mt-6 text-[17px] leading-9 text-[#B8BDD3] max-w-[320px] font-epilogue">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About & Resources - Flex on mobile */}
          <div className="grid grid-cols-2 lg:contents gap-10">
            {/* About */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 ">About</h3>
              <ul className="space-y-5 text-[#B8BDD3] text-lg">
                <li>Companies</li>
                <li>Pricing</li>
                <li>Terms</li>
                <li>Advice</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Resources</h3>
              <ul className="space-y-5 text-[#B8BDD3] text-lg">
                <li>Help Docs</li>
                <li>Guide</li>
                <li>Updates</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              Get job notifications
            </h3>
            <p className="text-[17px] leading-8 text-[#B8BDD3] max-w-[320px]">
              The latest job news, articles, sent to your inbox weekly.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:flex sm:flex-row items-stretch gap-2 lg:max-w-[420px]">
              <input
                type="email"
                placeholder="Email Address"
                className="h-14 px-5 lg:w-full sm:flex-1 bg-white text-gray-700 outline-none border-none"
              />
              <div>
                <button className="h-14 px-6 sm:px-8 bg-[#635BFF] text-white font-semibold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#343A5A] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#B8BDD3] text-base">
            2026 @ QuickHire. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-[#2A2F4F] flex items-center justify-center text-white hover:bg-[#635BFF] transition-colors">
              <i class="fa-brands fa-facebook-f"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#2A2F4F] flex items-center justify-center text-white hover:bg-[#635BFF] transition-colors">
              <i class="fa-brands fa-instagram"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#2A2F4F] flex items-center justify-center text-white hover:bg-[#635BFF] transition-colors">
              <i class="fa-brands fa-dribbble"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#2A2F4F] flex items-center justify-center text-white hover:bg-[#635BFF] transition-colors">
              <i class="fa-brands fa-linkedin-in"></i>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#2A2F4F] flex items-center justify-center text-white hover:bg-[#635BFF] transition-colors">
              <i class="fa-brands fa-twitter"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
