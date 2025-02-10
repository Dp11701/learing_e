import React, { useState, useEffect } from "react";
import { Card, Input, Typography } from "antd";
import Notification from "../../Noti/Notification";
import "./style.scss";

interface OTPInputProps {
  length: number;
  word: string;
  onSuccess: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, word, onSuccess }) => {
  const [inputValue, setInputValue] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");
  const [shake, setShake] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (inputValue.length === length) {
      if (inputValue === word.toUpperCase()) {
        setNotificationMessage("🎉 Correct! Well done!");
        setNotificationType("success");
        setCorrect(true);
      } else {
        setNotificationMessage("❌ Incorrect, try again.");
        setNotificationType("error");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }
  }, [inputValue, length, word]);

  const handleInputChange = (value: string) => {
    setInputValue(value.toUpperCase());
    setNotificationMessage("");
    setCorrect(false);
  };

  useEffect(() => {
    if (notificationType === "success" && notificationMessage) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  }, [notificationType, notificationMessage, onSuccess]);

  useEffect(() => {
    // Focus vào ô input đầu tiên khi component mount
    setTimeout(() => {
      document.querySelector("input")?.focus();
    }, 100);
  }, []);

  return (
    <Card className={`otp-card ${shake ? "shake" : ""} ${correct ? "correct" : ""}`}>
      <div className="otp-input-container">
        <Typography className="otp-title">
          Write down the word you just learned
        </Typography>
        <Input.OTP
          value={inputValue}
          length={length}
          formatter={(str: string) => str.toUpperCase()}
          variant="outlined"
          onChange={handleInputChange}
        />
        {notificationMessage && <Notification message={notificationMessage} type={notificationType} />}
      </div>
    </Card>
  );
};

export default OTPInput;
