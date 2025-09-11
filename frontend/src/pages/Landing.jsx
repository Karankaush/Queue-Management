import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-blue-600">SmartQueue</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Register
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Skip the Line, Manage Queues Smartly
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          SmartQueue helps vendors manage customers efficiently and lets
          customers book their spot without wasting time in long queues.
        </p>

        <div className="flex space-x-6">
          <Link to="/register?vendor=true">
            <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded-xl hover:bg-blue-600">
              I’m a Vendor
            </button>
          </Link>
          <Link to="/register?customer=true">
            <button className="px-6 py-3 bg-green-500 text-white text-lg rounded-xl hover:bg-green-600">
              I’m a Customer
            </button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12 px-6 grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Easy Queue Creation</h3>
          <p className="text-gray-600">
            Vendors can create queues in seconds and start managing customers
            instantly.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
          <p className="text-gray-600">
            Customers can see their live queue position and estimated wait time.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Save Time</h3>
          <p className="text-gray-600">
            No more standing in lines—just join from your phone and relax.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 mt-8 text-gray-500">
        © {new Date().getFullYear()} SmartQueue. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
