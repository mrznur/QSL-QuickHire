import Rectangle from "../../assets/Rectangle.png";
import Dashboard from "../../assets/Dashboard.png";

function Banner() {
  return (
    <>
      {/* Desktop Banner */}
      <section className="hidden md:block container mx-auto px-8 md:px-12 lg:px-16 my-10">
        <div className="relative w-full overflow-hidden rounded-lg">
          <img src={Rectangle} alt="" className="w-full h-auto" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full px-8 md:px-12 lg:px-16">
              <div className="grid grid-cols-2 gap-8 items-center">
                <div className="text-white text-left">
                  <h2 className="text-4xl lg:text-5xl font-bold font-clash mb-4">
                    Start posting jobs today
                  </h2>
                  <p className="text-lg mb-6 opacity-90 font-epilogue">
                    Start posting jobs for only $10.
                  </p>
                  <button className="btn bg-white text-[#4640DE] hover:bg-gray-100 font-semibold font-epilogue px-8 border-none">
                    Sign Up For Free
                  </button>
                </div>

                <div className="flex justify-center items-center">
                  <img
                    src={Dashboard}
                    alt="Dashboard"
                    className="w-[85%] mt-44 h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Banner - Full Width */}
      <section className="md:hidden w-full my-10">
        <div className="relative w-full overflow-hidden min-h-[500px]">
          <img
            src={Rectangle}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto rotate-180"
          />

          <div className="relative z-10 px-6 py-10 flex flex-col items-center gap-6">
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold font-clash mb-3">
                Start posting jobs today
              </h2>
              <p className="text-sm mb-4 opacity-90 font-epilogue">
                Start posting jobs for only $10.
              </p>
              <button className="btn btn-sm bg-white text-[#4640DE] hover:bg-gray-100 font-semibold font-epilogue px-6 border-none">
                Sign Up For Free
              </button>
            </div>

            <div className="w-full flex justify-center">
              <img
                src={Dashboard}
                alt="Dashboard"
                className="w-[90%] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
