import React, { useEffect } from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import AppHeader from "./components/Layout/Header";
import useUserStore from "./store/userStore";

const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup";

  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Layout className="app-layout">
      {!hideHeader && <AppHeader />}
      <AppRoutes />
    </Layout>
  );
};

export default App;
