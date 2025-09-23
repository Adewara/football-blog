import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, Navigate } from "react-router-dom";

function AuthPage() {
  const { user, login, signup, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // Wait until Firebase finishes checking the user state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Checking authentication...
      </div>
    );
  }

  // Redirect only after Firebase confirms the user
  if (user) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setProcessing(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 font-medium">{error}</div>
          )}

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-gray-600 hover:bg-gray-700 transition text-white py-2 rounded-md font-medium cursor-pointer"
          >
            {processing ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?
              <button
                onClick={() => setIsLogin(false)}
                className="text-red-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-red-600 font-medium hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </div>

        {/* Homepage link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-gray-500 text-sm hover:text-gray-700 hover:underline"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
