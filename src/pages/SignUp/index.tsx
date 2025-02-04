import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card, Layout, Input, Button } from "antd";
import "./style.scss";
import ButtonSubmit from "../../components/ButtonSubmit";
import { register } from "../../api/auth";
import Notification from "../../components/Noti/Notification";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

interface IFormInput {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const navigate = useNavigate()

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const mutation: UseMutationResult<any, Error, any> = useMutation({
    mutationFn: (data: any) => register(data),
  });

  const onSubmit = (data: IFormInput) => {
    const { confirmPassword, ...payload } = data; // Tách trường confirmPassword và tạo payload mới
    mutation.mutate(payload, {
      onSuccess: (response) => {
        if (response.status === "success") {
          setNotification({ message: "User registered successfully!", type: "success" });
          console.log("Registration successful:", response.message);
          navigate('/login')
        } else {
          setNotification({ message: response.message, type: "error" });
          console.log("Registration failed:", response.message);
        }
      },
      onError: (error: Error) => {
        setNotification({ message: error.message, type: "error" });
        console.log("Registration failed:", error.message);
      },
    });
  };
  

  const password = watch("password");

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
            {/* Name Input */}
            <div>
              <label className="label-form-item required">Name</label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Please input your name!",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                }}
                render={({ field }) => <Input {...field} />}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>
            {/* Email Input */}
            <div>
              <label className="label-form-item required">Email</label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Please input your email!",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field }) => <Input {...field} />}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            {/* Username Input */}
            <div>
              <label className="label-form-item required">Username</label>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{
                  required: "Please input your username!",
                  minLength: {
                    value: 5,
                    message: "Username must be at least 5 characters",
                  },
                }}
                render={({ field }) => <Input {...field} />}
              />
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="label-form-item required">Password</label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Please input your password!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <Input.Password {...field} autoComplete="new-password" />
                )}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="label-form-item required">
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Please confirm your password!",
                  validate: (value) =>
                    value === password || "The two passwords do not match!",
                }}
                render={({ field }) => (
                  <Input.Password {...field} autoComplete="new-password" />
                )}
              />
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="signup-button" style={{ marginTop: 12 }}>
              <ButtonSubmit title="SignUp" onClick={handleSubmit(onSubmit)} />
            </div>
          </form>

          {/* Redirect Prompt */}
          <div className="signup-prompt">
            <span>
              Already have an account? <a href="/login">Sign in now</a>
            </span>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default SignUp;
