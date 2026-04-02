import { useState } from "react";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/users/login", formData,{
                withCredentials: true,
            });
            console.log("User logged in:", response.data);
        } catch (error) {
            console.error("Error logging in user:", error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center">
                    User Login
                </h2>
                <p className="text-gray-500 text-sm text-center mb-6">
                    Please enter your credentials to log in.
                </p>
                {/* Login form will go here */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 cursor-point text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-gray-500 text-sm text-center mt-4">Don't have an account? <a href="/" className="text-blue-500 hover:underline">Register</a></p>
            </section>
        </div>
    )
}

export default Login;