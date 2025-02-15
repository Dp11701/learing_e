import React, { useState } from "react";
import { Layout, Card, Avatar, Button, Form, Input, Upload, Progress } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import "./style.scss";

const { Content } = Layout;

const ProfilePage: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [editing, setEditing] = useState(false);
  const [progress, setProgress] = useState(70);

  const onSubmit = (data: any) => {
    console.log("Updated Data:", data);
    setEditing(false);
  };

  return (
    <Layout className="profile-layout">
      <Content className="profile-content">
        <Card className="profile-card">
          <div className="avatar-section">
            <Avatar size={100} icon={<UserOutlined />} />
            <Upload>
              <Button icon={<UploadOutlined />}>Change Avatar</Button>
            </Upload>
          </div>
          
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="profile-form">
            <Form.Item label="Full Name">
              <Controller
                name="fullName"
                control={control}
                defaultValue="John Doe"
                render={({ field }) => <Input {...field} disabled={!editing} />}
              />
            </Form.Item>

            <Form.Item label="Email">
              <Controller
                name="email"
                control={control}
                defaultValue="johndoe@example.com"
                render={({ field }) => <Input {...field} disabled={!editing} />}
              />
            </Form.Item>

            {editing ? (
              <Button type="primary" htmlType="submit">Save</Button>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </Form>
        </Card>

        <Card className="progress-card">
          <h3>Learning Progress</h3>
          <Progress percent={progress} status="active" />
        </Card>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
