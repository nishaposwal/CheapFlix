import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import MovieDetail from './MovieDetail'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../Store/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useEffect } from 'react';

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-white text-xl">Loading...</div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  
  if (user) {
    return <Navigate to="/browse" replace />;
  }
  
  return children;
};

const Body = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          dispatch(addUser({
            id: user.uid,
            email: user.email,
            name: user.displayName,
            profilePic: user.photoURL,
            accessToken: user.accessToken,
          }));
        } else {
          dispatch(removeUser());
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, [dispatch]);

    // Show loading screen while determining auth state
    if (isLoading) {
      return <LoadingScreen />;
    }

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <PublicRoute><Login /></PublicRoute>
        },
        {
            path: "/browse",
            element: <ProtectedRoute><Browse /></ProtectedRoute>
        },
        {
            path: "/movie/:id",
            element: <ProtectedRoute><MovieDetail /></ProtectedRoute>
        }
    ])
    
  return (
   <RouterProvider router={appRouter} />
  )
}

export default Body