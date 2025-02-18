import React, { useState } from "react";
import { Layout, Card, Avatar, Button, Form, Input, Upload } from "antd";
import {
  UserOutlined,
  UploadOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import "./style.scss";

const { Content } = Layout;

const ProfilePage: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [editing, setEditing] = useState(false);

  const [avatar, setAvatar] = useState<string | null>(null);
  const onSubmit = (data: any) => {
    console.log("Updated Data:", data);
    setEditing(false);
  };
  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <Layout className="profile-layout">
      <Content className="profile-content">
        <Card className="profile-card">
          <div className="avatar-section">
            <div className="avatar-section">
              <Upload
                showUploadList={false}
                beforeUpload={() => true}
                onChange={handleUpload}
              >
                <Avatar
                  size={120}
                  src={avatar}
                  icon={!avatar && <UserOutlined />}
                />
                <div className="camera-icon">
                  <CameraOutlined />
                </div>
              </Upload>
            </div>
          </div>

          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="profile-form"
          >
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
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
