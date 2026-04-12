import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser, getCurrentUser } from "../lib/api.js";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(formData);

      const res = await getCurrentUser();
      setUser(res.data);

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-2 text-center">
          User Registration
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          This is a simple user registration application.
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={formData.name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
            className="border p-2 w-full rounded"
          />

          <input
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Email"
            className="border p-2 w-full rounded"
          />

          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Do you have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>

      </section>
    </div>
  );
}

export default Register;