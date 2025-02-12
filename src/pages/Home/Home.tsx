import React, { useEffect, useState } from "react";
import { Layout, List, Card, Progress, Spin, Alert, Typography, Avatar, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useUsers } from "../../api/users";
import "./style.scss";
import CustomButton from "../../components/Button";
import { commonColor } from "../../constants/variables";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

type Task = {
  id: string;
  title: string;
  status: "Incomplete" | "In Progress" | "Completed";
  progress: number;
};
const getTaskStatus = (
  progress: number
): "Incomplete" | "In Progress" | "Completed" => {
  if (progress === 100) return "Completed";
  if (progress > 0) return "In Progress";
  return "Incomplete";
};
const calculateProgress = (progress: string): number => {
  const [completed, total] = progress.split(" / ").map(Number);
  return (completed / total) * 100;
};
const taskStatusColors = {
  Incomplete: "#fff1f0",
  "In Progress": "#e6f7ff",
  Completed: "#f6ffed",
};

const Home: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();
  const { user, fetchUser } = useUserStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) {
    return (
      <Layout className="home-layout">
        <Layout>
          <Sider width={250} className="sider">
            <Spin />
          </Sider>
          <Content className="home-content">
            <Spin />
          </Content>
        </Layout>
      </Layout>
    );
  }
  const tasks: Task[] = [
    {
      id: "word",
      title: "Học 10 từ mới",
      status: getTaskStatus(calculateProgress(user.progress.word)),
      progress: calculateProgress(user.progress.word),
    },
    {
      id: "listen",
      title: "Luyện nghe",
      status: getTaskStatus(calculateProgress(user.progress.listen)),
      progress: calculateProgress(user.progress.listen),
    },
    {
      id: "grammar",
      title: "Ngữ pháp cơ bản",
      status: getTaskStatus(calculateProgress(user.progress.grammar)),
      progress: calculateProgress(user.progress.grammar),
    },
  ];

  const handleButtonClick = (id: string) => {
    const routes: Record<string, string> = {
      word: "/task",
      listen: "/listen",
      grammar: "/grammar",
    };
    navigate(routes[id]);
  };

  return (
    <Layout className="home-layout">
      <Layout>
        {/* Responsive Sider for user progress */}
        <Sider width={250} collapsible collapsed={collapsed} className="sider user-list">
          <Button className="menu-toggle" onClick={() => setCollapsed(!collapsed)}>
            <MenuOutlined />
          </Button>
          {isLoading ? (
            <Spin />
          ) : error ? (
            <Alert message="Failed to fetch users" type="error" />
          ) : (
            <List
              className={collapsed ? "collapsed-list" : "expanded-list"}
              dataSource={users}
              renderItem={(user) => (
                <List.Item key={user.id} className="user-list-item">
                  <Avatar style={{ backgroundColor: "#1890ff" }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  {!collapsed && (
                    <div style={{ flex: 1, marginLeft: 10 }}>
                      {user.name}
                      <Progress
                        percent={calculateProgress(user.progress as any)}
                        size="small"
                      />
                    </div>
                  )}
                </List.Item>
              )}
            />
          )}
        </Sider>

        {/* Content */}
        <Content className="home-content">
          <h2>Today's Tasks</h2>
          <div className="task-list">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className="task-card"
                title={task.title}
                onClick={() => handleButtonClick(task.id)}
                style={{ backgroundColor: taskStatusColors[task.status], boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", cursor: 'pointer' }}
              >
                <div className="progress-container">
                  <Progress type="circle" percent={task.progress} width={50} />
                </div>
                {task.status === "Completed" ? (
                  <Typography.Text className="success-text">Success</Typography.Text>
                ) : (
                  <CustomButton
                    onClick={() => handleButtonClick(task.id)}
                    title={task.status === "Incomplete" ? "Start" : "Continue"}
                    color={task.status === "Incomplete" ? commonColor.primary.button : commonColor.secondary.button}
                    textColor={commonColor.primary.text}
                  />
                )}
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
