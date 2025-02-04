// src/components/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicRoute;
