import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple admin check - in a real app, this would be an API call
    const adminKey = import.meta.env.VITE_ADMIN_KEY;
    
    // Check if it's admin login
    if (email === "admin@quickhire.com" && password === adminKey) {
      // Store admin session
      sessionStorage.setItem("adminKey", password);
      sessionStorage.setItem("userEmail", email);
      
      // Redirect to admin dashboard
      navigate("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-8 md:px-12 lg:px-16 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-clash">Welcome Back</h1>
              <p className="text-gray-600 font-epilogue mt-2">
                Sign in to your account
              </p>
            </div>

            {error && (
              <div className="alert alert-error mb-6 font-epilogue">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full font-epilogue"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-epilogue">
                  Password
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full font-epilogue"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span className="text-sm text-gray-600 font-epilogue">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-sm text-[#4640DE] hover:underline font-epilogue">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn bg-[#4640DE] hover:bg-[#3730a3] text-white w-full font-semibold font-epilogue border-none"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 font-epilogue">
                Don't have an account?{" "}
                <a href="#" className="text-[#4640DE] hover:underline font-semibold">
                  Sign up
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center font-epilogue">
                Admin login: admin@quickhire.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
