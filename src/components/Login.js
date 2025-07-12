import React from "react";
import Header from "./Header";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const bg =
    "https://assets.nflxext.com/ffe/siteui/vlv3/7d2359a4-434f-4efa-9ff3-e9d38a8bde7f/web/AE-en-20250707-TRIFECTA-perspective_dee3d953-957d-4677-9b27-c8c93aa5b9a7_large.jpg";
  return (
    <div className="relative">
      <Header />
      <div className="w-full h-screen relative">
        <img src={bg} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black bg-opacity-70 p-8 flex flex-col items-center gap-4">
          <h1 className="text-white text-4xl font-bold mb-6">Sign In</h1>

          {!isSignIn && (
            <input
              type="text"
              placeholder="Username"
              className="p-2 rounded-md w-full bg-transparent border-2 border-gray-700 text-white"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-md w-full bg-transparent border-2 border-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-md w-full bg-transparent border-2 border-gray-700 text-white"
          />

          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-md w-full"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <div
            className="text-white text-sm cursor-pointer"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn
              ? "New to Netflix? Sign up now."
              : "Already have an account? Login"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
