import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Input, Button } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { register } from "../../api/auth";
import Notification from "../../components/Noti/Notification";

interface RegisterFormInputs {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const password = watch("password");

  const registerMutation: UseMutationResult<any, Error, any> = useMutation({
    mutationFn: (data: any) => register(data),
  });

  const onSignUpSubmit = (data: any) => {
    const { confirmPassword, ...payload } = data;
    registerMutation.mutate(payload, {
      onSuccess: (response) => {
        if (response.status === "success") {
          setNotification({
            message: "User registered successfully!",
            type: "success",
          });
          console.log("Registration successful:", response.message);
        } else {
          setNotification({ message: response.message, type: "error" });
          console.log("Registration failed:", response.message);
        }
      },
      onError: (error: Error) => {
        setNotification({ message: error.message, type: "error" });
        console.log("Registration failed:", error);
      },
    });
  };

  return (
    <div className="form-box register">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <form onSubmit={handleSubmit(onSignUpSubmit)}>
        <h1>Registration</h1>

        <div className="input-box">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Name" prefix={<UserOutlined />} />
            )}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>

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
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Email" prefix={<MailOutlined />} />
            )}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
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

        <div className="input-box">
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Confirm Password"
                prefix={<LockOutlined />}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="primary" htmlType="submit" className="btn">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
