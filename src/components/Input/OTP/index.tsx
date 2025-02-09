import React, { useState, useEffect } from "react";
import { Card, Input, Typography } from "antd";
import ConfettiNotification from "../../Noti/ConfettiNotification";
import "./style.scss";

interface OTPInputProps {
  length: number;
  word: string;
  onSuccess: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, word, onSuccess }) => {
  const [inputValue, setInputValue] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (inputValue.length === length) {
      if (inputValue === word.toUpperCase()) {
        setNotificationMessage("Correct word!");
        setNotificationType("success");
      } else {
        setNotificationMessage("Incorrect word. Please try again.");
        setNotificationType("error");
      }
    } if (notificationMessage !== "") {
      // Reset notification when input changes
      setNotificationMessage("");
    }
  }, [inputValue, length, word]);
  useEffect(() => {
    console.log("loi nay", notificationMessage);
  }, [notificationMessage]);
  const handleInputChange = (value: string) => {
    setInputValue(value.toUpperCase());
  };

  useEffect(() => {
    if (notificationType === "success" && notificationMessage) {
      setTimeout(() => {
        onSuccess();
      }, 4000); // Hold for 2 seconds before moving to the next word
    }
  }, [notificationType, notificationMessage, onSuccess]);

  return (
    <Card className="otp-card">
      <div className="otp-input-container">
        <Typography style={{ fontSize: 28, fontWeight: 500 }}>
          Write down the word you just learned
        </Typography>
        <Input.OTP
          value={inputValue}
          length={length}
          formatter={(str: string) => str.toUpperCase()}
          variant="outlined"
          onChange={handleInputChange}
        />
        {notificationMessage && (
          <ConfettiNotification
            message={notificationMessage}
            type={notificationType}
          />
        )}
      </div>
    </Card>
  );
};

export default OTPInput;
