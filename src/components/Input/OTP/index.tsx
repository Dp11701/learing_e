import React, { useState } from "react";
import { Input, Button, message } from "antd";
import './style.scss'

interface OTPInputProps {
  length: number;
  word: string;
  onSuccess: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, word, onSuccess }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleInputSubmit = () => {
    if (inputValue === word) {
      message.success("Correct word!");
      onSuccess();
    } else {
      message.error("Incorrect word. Please try again.");
    }
  };

  return (
    <div className="otp-input-container">
      <Input.OTP
        value={inputValue}
        onChange={handleInputChange}
        length={length}
        formatter={(str) => str.toUpperCase()}
      />
      <Button onClick={handleInputSubmit}>Submit</Button>
    </div>
  );
};

export default OTPInput;