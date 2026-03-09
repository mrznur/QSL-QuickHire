import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminKey = sessionStorage.getItem("adminKey");
    setIsAdmin(!!adminKey);

    // Listen for storage changes (login/logout)
    const handleStorageChange = () => {
      const key = sessionStorage.getItem("adminKey");
      setIsAdmin(!!key);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = (
    <>
      <li>
        <Link
          to="/jobs"
          className="text-lg cursor-pointer text-gray-500 font-epilogue hover:text-[#4640DE]"
        >
          Find Jobs
        </Link>
      </li>
      <li>
        <Link
          to="/companies"
          className="text-lg cursor-pointer text-gray-500 font-epilogue hover:text-[#4640DE]"
        >
          Browse Companies
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 flex justify-between items-center">
        <div className="navbar-start">
          <Link to="/" onClick={handleLogoClick}>
            <img src={Logo} alt="" />
          </Link>
          <Link
            to="/"
            onClick={handleLogoClick}
            className="btn btn-ghost text-xl lg:text-3xl font-bold gap-0 font-redhat"
          >
            QuickHire
          </Link>
          <div className="hidden lg:flex ml-4">
            <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
          </div>
        </div>

        <div className="navbar-center hidden">
          {/* Placeholder if needed later */}
        </div>

        <div className="navbar-end gap-2">
          {isAdmin ? (
            <div className="hidden sm:flex">
              <Link to="/admin" className="font-bold text-gray-900 font-clash text-2xl px-6 hover:text-[#4640DE] transition-colors">
                Admin Here!!
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex gap-3">
              <Link to="/login" className="text-xl btn btn-ghost font-semibold text-center text-[#4640DE] hover:text-[#0e0b5c] font-epilogue px-6 border-2">
                Login
              </Link>
              <button className="btn font-semibold text-white text-center justify-items-center bg-[#4640DE] hover:bg-[#0e0b5c] border-none font-epilogue px-6">
                Sign Up
              </button>
            </div>
          )}

          <div className="dropdown dropdown-end border border-1 rounded-full lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
              <div className="divider my-1 sm:hidden"></div>
              {isAdmin ? (
                <li className="sm:hidden">
                  <Link to="/admin" className="font-bold text-gray-900 font-epilogue w-full justify-center">
                    Admin
                  </Link>
                </li>
              ) : (
                <>
                  <li className="sm:hidden">
                    <Link to="/login" className="btn font-semibold text-[#4640DE] hover:text-[#0e0b5c] font-epilogue w-full justify-center border-2 my-2">
                      Login
                    </Link>
                  </li>
                  <li className="sm:hidden">
                    <button className="btn font-semibold text-white bg-[#4640DE] hover:bg-[#0e0b5c] border-none font-epilogue w-full justify-center">
                      Sign Up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Navbar;