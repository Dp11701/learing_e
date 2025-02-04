// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../components/Router/PrivateRoute";
import PublicRoute from "../components/Router/PublicRoute";
import TaskPage from "../pages/Task";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      /><Route
      path="/task"
      element={
        <PrivateRoute>
          <TaskPage />
        </PrivateRoute>
      }
    />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
