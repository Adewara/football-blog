import { AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-8">Annoying - I Know! Sorry!</p>

      <div className="flex gap-4">
        <Link to="/">
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white rounded-md shadow-md hover:shadow-lg">
            Return Home
          </button>
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white rounded-md shadow-md hover:shadow-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
