import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests

export default function AuthPage() {
  const [tabIndex, setTabIndex] = useState(0); // 0 = Login, 1 = Signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleTabChange = (index) => {
    setTabIndex(index);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth/${
      tabIndex === 0 ? "login" : "signup"
    }`;

    // Prepare data for submission
    const requestData = tabIndex === 0 ? 
      { email: formData.email, password: formData.password } :
      { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await axios.post(apiUrl, requestData);
      console.log("API response:", response.data); 
      if (response.data) {
        // Store necessary data in localStorage (e.g., token and user info)
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect user to dashboard or home page after successful login/signup
        window.location.href = "/"; // Change this to your desired redirect path
      } else {
        // Handle failure (e.g., invalid credentials or validation errors)
        alert(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-teal-500 text-5xl mb-2">
            <i className="fas fa-user-circle"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-700">Welcome Aboard!</h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-around mb-6 border-b">
          <button
            onClick={() => handleTabChange(0)}
            className={`w-1/2 py-2 text-lg font-semibold ${
              tabIndex === 0 ? "text-[#0156b3] border-b-2 border-[#0156b3]" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange(1)}
            className={`w-1/2 py-2 text-lg font-semibold ${
              tabIndex === 1 ? "text-[#0156b3] border-b-2 border-[#0156b3]" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name (Sign Up only) */}
          {tabIndex === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-500">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-500">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-500">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-2 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Confirm Password (Sign Up only) */}
          {tabIndex === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-500">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-2 py-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-[#0156b3] hover:bg-teal-600 font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
          >
            {tabIndex === 0 ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Terms and Conditions (Sign Up only) */}
        {tabIndex === 1 && (
          <p className="mt-4 text-sm text-center text-gray-500">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-teal-500 underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-teal-500 underline">
              Privacy Policy
            </a>.
          </p>
        )}
      </div>
    </div>
  );
}
