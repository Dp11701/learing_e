// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../components/Router/PrivateRoute";
import PublicRoute from "../components/Router/PublicRoute";
import TaskPage from "../pages/Task";
import AuthForm from "../pages/Auth";
import ListeningPractice from "../pages/ListeningPractice";
import UnderConstruction from "../pages/UnderConstruction";

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
      />
      <Route
        path="/task"
        element={
          <PrivateRoute>
            <TaskPage />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/listen"
        element={
          <PrivateRoute>
            <ListeningPractice />
          </PrivateRoute>
        }
      /> */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthForm />
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
      <Route path="*" element={<UnderConstruction />} />
    </Routes>
  );
};

export default AppRoutes;
