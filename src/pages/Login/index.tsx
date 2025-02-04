import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card, Layout, Input, Button, Form } from "antd";
import "./style.scss";
import { login } from "../../api/auth";
import { LoginRequest, LoginResponse } from "../../models/auth.model";
import Notification from "../../components/Noti/Notification";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

interface IFormInput {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const mutation: UseMutationResult<LoginResponse, Error, LoginRequest> =
    useMutation({
      mutationFn: (data: LoginRequest) => login(data),
    });

  const onSubmit = (data: IFormInput) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        if (response.token) {
          setNotification({ message: "Login successful!", type: "success" });
          console.log("Login successful:", response);
          localStorage.setItem("token", response.token);
          navigate('/')
        } else {
          setNotification({
            message: "Login successful but no token received!",
            type: "error",
          });
          console.log("Login successful but no token received:", response);
        }
      },
      onError: (error: Error) => {
        setNotification({ message: error.message, type: "error" });
        console.log("Login failed:", error.message);
      },
    });
  };

  return (
    <Layout className="login-layout">
      <Content className="login-content">
        <Card className="login-card">
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Input */}
            <Form.Item
              label="Username"
              name="username"
              className="label-form-item"
              wrapperCol={{ span: 24 }}
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </Form.Item>

            {/* Password Input */}
            <Form.Item
              label="Password"
              name="password"
              className="label-form-item"
              wrapperCol={{ span: 24 }}
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input.Password {...field} autoComplete="new-password" />
                )}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </Form.Item>

            {/* Submit Button */}
            <Form.Item wrapperCol={{ span: 24 }} className="login-button">
              <Button className="button-login" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </form>

          {/* Redirect Prompt */}
          <div className="signup-prompt">
            <span>
              Don't have an account yet? <a href="/signup">Sign up now</a>
            </span>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;
