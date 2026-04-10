import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register( {setUser} ) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", formData, {
        withCredentials: true 
      });
      console.log("User registered:", response.data);
      setUser(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name
            </label>
            <input
              value={formData.name}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">
              Password
            </label>
            <input
              value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-gray-500 text-sm text-center mt-4">Do you have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a></p>
      </section>
    </div>
  );
}

export default Register;