import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { validateSignIn, validateSignUp } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState(null);
  const email = useRef("");
  const password = useRef("");
  const username = useRef("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = isSignIn
      ? validateSignIn(email.current.value, password.current.value)
      : validateSignUp(
          email.current.value,
          password.current.value,
          username.current.value
        );
    setError(error);

    if (!error) {
      isSignIn ? signIn() : signUp();
    }
  };

  const signUp = () => {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username.current.value,
        })
          .then(() => {
            navigate("/browse");
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode + " " + errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode + " " + errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  const bg =
    "https://assets.nflxext.com/ffe/siteui/vlv3/7d2359a4-434f-4efa-9ff3-e9d38a8bde7f/web/AE-en-20250707-TRIFECTA-perspective_dee3d953-957d-4677-9b27-c8c93aa5b9a7_large.jpg";
  return (
    <div className="relative">
      <Header />
      <div className="w-full h-screen relative">
        <img src={bg} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black bg-opacity-70 p-8 flex flex-col items-center gap-4">
          <h1 className="text-white text-4xl font-bold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignIn && (
            <input
              ref={username}
              type="text"
              placeholder="Username"
              className="p-2 rounded-md w-full bg-transparent border-2 border-gray-700 text-white"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="p-2 rounded-md w-full bg-transparent border-2 border-gray-700 text-white"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-2 rounded-md w-full bg-transparent border-2 border-gray-700 text-white"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-red-600 text-white p-2 rounded-md w-full"
            onClick={handleSubmit}
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
