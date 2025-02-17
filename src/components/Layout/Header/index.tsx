import React, { useState } from "react";
import {
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Input,
  Badge,
  Drawer,
  Button,
} from "antd";
import {
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  HomeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useUserStore from "../../../store/userStore";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    useUserStore.setState({ user: null });
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <a onClick={() => setMenuVisible(true)}>Profile</a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <div className="app-title">LinguaBoost</div>
      <div className="nav-menu">
        <a href="/" className="nav-item">
          <HomeOutlined /> Home
        </a>
        <a
          onClick={() => {
            navigate("/lessons");
          }}
          className="nav-item"
        >
          <BookOutlined /> Lessons
        </a>
      </div>
      <div className="header-actions" onClick={() => setMenuVisible(true)}>
        <div className="user-info">
          <Avatar icon={<UserOutlined />} />
          <span className="username">{user?.name || "Guest"}</span>
        </div>
      </div>
      <Drawer
        title="Profile"
        placement="right"
        closable={true}
        onClose={() => setMenuVisible(false)}
        visible={menuVisible}
        className="profile-drawer"
      >
        <div className="profile-content">
          <Avatar size={80} icon={<UserOutlined />} />
          <h3>{user?.name || "User Name"}</h3>
          <Button type="primary" block onClick={() => navigate("/profile")}>
            View Profile
          </Button>
          <Button block onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Drawer>
    </Header>
  );
};

export default AppHeader;
