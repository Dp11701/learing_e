import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useUserStore from "../../../store/userStore";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    useUserStore.setState({ user: null });
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <div className="app-title">English Learning Dashboard</div>
      <div className="user-section">
        <Dropdown overlay={userMenu} placement="bottomRight" arrow>
          <div className="user-info">
            <Avatar icon={<UserOutlined />} />
            <span className="username">{user?.name || "Guest"}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
