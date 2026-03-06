import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 border max-w-md w-full">
        <div className="card-body text-center">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="opacity-80 mt-2">Page not found.</p>
          <div className="card-actions justify-center mt-4">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
