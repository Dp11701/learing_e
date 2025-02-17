import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Notification from "../../components/Noti/Notification";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const loginMutation: UseMutationResult<any, Error, any> = useMutation({
    mutationFn: (data: any) => login(data),
  });

  const onLoginSubmit = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.token) {
          setNotification({ message: "Login successful!", type: "success" });
          localStorage.setItem("token", response.token);
          navigate("/");
        } else {
          setNotification({
            message: response?.message,
            type: "error",
          });
        }
      },
      onError: (error: Error) => {
        setNotification({
          message: error?.message,
          type: "error",
        });
      },
    });
  };

  return (
    <div className="form-box login">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <h1>Login</h1>

        <div className="input-box">
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Username"
                prefix={<UserOutlined />}
              />
            )}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>

        <div className="input-box">
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            )}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <div className="forgot-link">
          <a href="#">Forgot Password?</a>
        </div>

        <Button type="primary" htmlType="submit" className="btn" loading={loginMutation.isPending}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
