import { useState } from "react";
import { registerUser } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ navigation hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(formData); // ✅ API call
      navigate("/api/auth/login");           // ✅ redirect after success
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
          Create an account
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
          Start managing your notes securely
        </p>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100
                         focus:border-gray-900 dark:focus:border-gray-100 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100
                         focus:border-gray-900 dark:focus:border-gray-100 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-100
                         focus:border-gray-900 dark:focus:border-gray-100 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-2 rounded-md text-sm font-medium
              bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
              hover:bg-gray-800 dark:hover:bg-gray-200
              transition
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Registering..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/api/auth/login" // ✅ frontend route
            className="text-gray-900 dark:text-gray-100 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
