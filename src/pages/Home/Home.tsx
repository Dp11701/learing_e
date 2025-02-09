import React, { useEffect } from "react";
import { Layout, List, Card, Progress, Spin, Alert } from "antd";
import { useUsers } from "../../api/users";
import "./style.scss";
import { CheckOutlined } from "@ant-design/icons";
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
const Home: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();

  const { user, fetchUser } = useUserStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Layout className="home-layout">
        <Layout>
          <Sider width={200} className="sider">
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
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const handleButtonClick = (status: string) => {
    if (status === "Incomplete") {
      navigate('/task')
    } else {
      console.log("Continue");
    }
  };

  return (
    <Layout className="home-layout">
      <Layout>
        {/* Sider for user progress */}
        <Sider width={200} className="sider">
          {isLoading ? (
            <Spin />
          ) : error ? (
            <Alert message="Failed to fetch users" type="error" />
          ) : (
            <List
              header={
                <div>
                  <strong>Users</strong>
                </div>
              }
              bordered
              dataSource={users}
              renderItem={(user) => (
                <List.Item key={user.id}>
                  <div style={{ flex: 1 }}>
                    {user.name}
                    <Progress
                      percent={calculateProgress(user.progress as any)}
                      size="small"
                    />
                  </div>
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
              <Card key={task.id} className="task-card" title={task.title}>
                {task.status === "Completed" ? (
                  <CheckOutlined style={{ color: "green", fontSize: "24px" }} />
                ) : (
                  <CustomButton
                    onClick={() => handleButtonClick(task.status)}
                    title={task.status === "Incomplete" ? "Start" : "Continue"}
                    color={
                      task.status === "Incomplete"
                        ? commonColor.primary.button
                        : commonColor.secondary.button
                    }
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
