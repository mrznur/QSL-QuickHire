import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";

function Navbar() {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-xl font-semibold text-gray-500" : "opacity-80"
          }
        >
          Find Jobs
        </NavLink>
      </li>
      <li>
        <a className="text-xl font-semibold cursor-pointer text-gray-500">
          Browse Companies
        </a>
      </li>
      <li></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 flex justify-between items-center">
        <div className="navbar-start">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
          <Link
            to="/"
            className="btn btn-ghost text-xl lg:text-3xl font-bold gap-0"
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
          <div className="hidden sm:flex lg:gap-4">
            <button className="btn text-xl btn-ghost btn-sm md:btn-md text-[#4640DE] font-bold lg:px-4 py-2 hover:text-[#0e0b5c]">
              Login
            </button>
            <button className="btn text-xl btn-primary btn-sm font-bold text-white bg-[#4640DE] lg:px-4 py-2 md:btn-md hover:bg-[#0e0b5c]">
              Sign Up
            </button>
          </div>

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
              <li className="sm:hidden">
                <button className="btn px-2 py-2 w-24 font-semibold btn-ghost btn-sm text-xl justify-start text-[#4640DE] hover:text-[#0e0b5c] cursor-pointer">
                  Login
                </button>
              </li>
              <li className="sm:hidden">
                <button className="btn px-2 mt-1 font-semibold py-2 w-24 btn-primary btn-sm justify-start text-xl bg-[#4640DE] hover:bg-[#0e0b5c] text-white cursor-pointer">
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Navbar;