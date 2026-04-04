import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import JobListings from "./pages/JobListings/JobListings.jsx";
import JobDetails from "./pages/JobDetails/JobDetails.jsx";
import Companies from "./pages/Companies/Companies.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Login from "./pages/Login/Login.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

// Redirects logged-in admin away from public pages to /admin
function PublicRoute({ children }) {
  const isAdmin = !!sessionStorage.getItem("adminToken");
  return isAdmin ? <Navigate to="/admin" replace /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/jobs" element={<PublicRoute><JobListings /></PublicRoute>} />
        <Route path="/jobs/:id" element={<PublicRoute><JobDetails /></PublicRoute>} />
        <Route path="/companies" element={<PublicRoute><Companies /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
