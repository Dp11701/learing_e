import React from "react";
import { Layout, List, Card, Progress } from "antd";
import "./style.scss";
import CustomButton from "../../components/Button";
import { commonColor } from "../../constants/variables";

const { Content, Sider } = Layout;

type User = {
  id: number;
  name: string;
  progress: number; // Progress in percentage
};

type Task = {
  id: number;
  title: string;
  status: "Incomplete" | "In Progress" | "Completed";
};

const Home: React.FC = () => {
  const users: User[] = [
    { id: 1, name: "Huyền lười học", progress: 60 },
    { id: 2, name: "Nguyễn Đức Phú", progress: 100 },
  ];

  const tasks: Task[] = [
    { id: 1, title: "Học 10 từ mới", status: "Incomplete" },
    { id: 2, title: "Luyện nghe", status: "In Progress" },
    { id: 3, title: "Ngữ pháp cơ bản", status: "Incomplete" },
  ];

  const handleButtonClick = (status: string) => {
    if (status === "Incomplete") {
      console.log("Start");
    } else {
      console.log("Continue");
    }
  };

  return (
    <Layout className="home-layout">
      <Layout>
        {/* Sider for user progress */}
        <Sider width={200} className="sider">
          <List
            header={
              <div>
                <strong>Users</strong>
              </div>
            }
            bordered
            dataSource={users}
            renderItem={(user) => (
              <List.Item>
                <div style={{ flex: 1 }}>
                  {user.name}
                  <Progress percent={user.progress} size="small" />
                </div>
              </List.Item>
            )}
          />
        </Sider>

        {/* Content */}
        <Content className="home-content">
          <h2>Today's Tasks</h2>
          <div className="task-list">
            {tasks.map((task) => (
              <Card key={task.id} className="task-card" title={task.title}>
                <p>Status: {task.status}</p>
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
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
