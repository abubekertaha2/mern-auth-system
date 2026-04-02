import React from "react";
import { Link } from "react-router-dom"; 
import heroImage from "../assets/hero.png"; 

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-blue-600">RegisterApp</h1> 
          <nav className="space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header> */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        {/* Text */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Simple, Secure & Fast Registration
          </h2>
          <p className="text-gray-600 text-lg">
            Create your account in seconds and start managing your profile easily.
            Our platform is fast, responsive, and secure.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/learn-more"
              className="text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img
            src={heroImage}
            alt="Registration illustration"
            className="w-full max-w-md"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-200 rounded-lg shadow ">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Registration
              </h3>
              <p className="text-gray-600">
                Complete the registration process in under 1 minute.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-200 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Data
              </h3>
              <p className="text-gray-600">
                Your personal information is encrypted and fully protected.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-200 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Access
              </h3>
              <p className="text-gray-600">
                Login anytime, anywhere, and manage your profile effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          &copy; {new Date().getFullYear()} RegisterApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}