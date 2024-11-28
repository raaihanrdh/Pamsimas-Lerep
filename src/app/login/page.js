"use client";
import React, { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { API_URL } from "../common/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const API_V = process.env.NEXT_PUBLIC_API_V;

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      console.log(data);

    console.log("TEST")

      const response = await axios.post(
        `${ROOT_API}/${API_V}`,
        JSON.stringify(data),
        config
      );
      // const response = await fetch(`${ROOT_API}/${API_V}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      const result = await response.data;
      console.log(result.message);
      if (response.status == 200) {
        //TAMBAHIN
        Cookie.set("user", JSON.stringify(result.message), {
          expires: 1,
        });
        //------

        window.location.href = "dashboard"; // Redirect ke halaman Dashboard
      } else {
        // Jika login gagal
        setErrorMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-blue-50 to-blue-100 items-center justify-center">
        <div className="text-center px-6">
          <img
            src="https://via.placeholder.com/300"
            alt="Illustration"
            className="w-3/4 mx-auto drop-shadow-lg"
          />
          <h1 className="text-3xl font-bold text-sky-400 mt-6">
            Welcome to PAMSIMAS
          </h1>
          <p className="text-gray-600 mt-3 text-lg leading-relaxed">
            Manage your system efficiently and make a difference in your
            community.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-600">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-3xl">
          <h2 className="text-3xl font-bold text-center text-sky-400">
            Welcome Back!
          </h2>
          <p className="text-sm text-center text-gray-500 mb-8">
            Enter your credentials to access the app
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium"
              >
                ID
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="py-3 px-7 bg-sky-500 rounded-full hover:bg-blue-500 text-white font-medium shadow-md transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
