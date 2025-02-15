import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import LoginForm from "./Login";
import RegisterForm from "./Signup";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const handleChangeForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="wrapper-auth">
      <div className={`container ${isLogin ? "active" : ""}`}>
        <LoginForm />
        <RegisterForm />
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={handleChangeForm}>
              Register
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={handleChangeForm}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
