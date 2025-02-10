import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Card, Layout, Input, Button, Form } from "antd";
import { register, login } from "../../api/auth";
import Notification from "../../components/Noti/Notification";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const { Content } = Layout;

const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({ mode: "onChange" });
  const [contentClass, setContentClass] = useState("login-content sign-in");

  useEffect(() => {
    if (isSignIn) {
      setContentClass("login-content sign-in");
    } else {
      setContentClass("login-content sign-up");
    }
  }, [isSignIn]);

  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const registerMutation: UseMutationResult<any, Error, any> = useMutation({
    mutationFn: (data: any) => register(data),
  });

  const loginMutation: UseMutationResult<any, Error, any> = useMutation({
    mutationFn: (data: any) => login(data),
  });

  const onSignUpSubmit = (data: any) => {
    const { confirmPassword, ...payload } = data; // Tách trường confirmPassword và tạo payload mới
    registerMutation.mutate(payload, {
      onSuccess: (response) => {
        if (response.status === "success") {
          setNotification({
            message: "User registered successfully!",
            type: "success",
          });
          console.log("Registration successful:", response.message);
          navigate("/login");
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

  const onLoginSubmit = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.token) {
          setNotification({ message: "Login successful!", type: "success" });
          console.log("Login successful:", response);
          localStorage.setItem("token", response.token);
          navigate("/");
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

  const password = watch("password");

  return (
    <Layout className="login-layout">
      <Content className={contentClass}>
        <Card className="login-card">
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          <form
            onSubmit={handleSubmit(isSignIn ? onLoginSubmit : onSignUpSubmit)}
          >
            {isSignIn ? (
              <>
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
                    <p className="error-message">
                      {errors.username?.message?.toString() || ""}
                    </p>
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
                    <p className="error-message">
                      {errors.password?.message?.toString() || ""}
                    </p>
                  )}
                </Form.Item>

                {/* Submit Button */}
                <Form.Item wrapperCol={{ span: 24 }} className="login-button">
                  <Button className="button-login" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </>
            ) : (
              <>
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
                    <p className="error-message">
                      {errors.name.message?.toString() || ""}
                    </p>
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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Please enter a valid email address",
                      },
                    }}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.email && (
                    <p className="error-message">
                      {errors.email.message?.toString() || ""}
                    </p>
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
                    <p className="error-message">
                      {errors?.username.message?.toString() || ""}
                    </p>
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
                    }}
                    render={({ field }) => (
                      <Input.Password {...field} autoComplete="new-password" />
                    )}
                  />
                  {errors.password && (
                    <p className="error-message">
                      {errors?.password?.message?.toString() || ""}
                    </p>
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
                      {errors.confirmPassword.message?.toString() || ""}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="login-button" style={{ marginTop: 12 }}>
                  <Button className="button-login" htmlType="submit">
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </form>
          <div className="signup-prompt">
            <span>
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </span>
            <b onClick={() => setIsSignIn(!isSignIn)} className="pointer">
              {isSignIn ? "Sign up here" : "Sign in here"}
            </b>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default AuthForm;
