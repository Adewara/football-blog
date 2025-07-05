import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom"; // or Next.js <Link> if using Next

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">
        Looks like that match has been postponed.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
      >
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
