import React, { useState, useEffect } from "react";
import { Card, Input, Tag } from "antd";
import Notification from "../../components/Noti/Notification";
import "./style.scss";

interface OTPInputProps {
  example: string;
  tense: string;
  structure: string;
  onSuccess: () => void;
}

const CardCheck: React.FC<OTPInputProps> = ({
  example,
  onSuccess,
  tense,
  structure,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [shake, setShake] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (inputValue.length === length) {
      setNotificationMessage("🎉 Correct! Well done!");
      setNotificationType("success");
      setCorrect(true);
    } else {
      setNotificationMessage("❌ Incorrect, try again.");
      setNotificationType("error");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [inputValue, length, example]);

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
  const sentence = "Geeks for Geeks";
  const wordsArray = sentence.split(" ");
  const handleWordClick = (word: string) => {
    setInputValue((inputValue + " " + word).trim());
  };

  useEffect(() => {
    console.log(inputValue, "inputValue");
  }, [inputValue]);
  return (
    <Card
      className={`grammar-card ${shake ? "shake" : ""} ${
        correct ? "correct" : ""
      }`}
      title={`Learn ${tense}`}
    >
      <div className="grammar-input-container">
        <h3>{structure}</h3>
        <div className="word-tags">
          {wordsArray.map((word, index) => (
            <Tag
              key={index}
              //   bordered={false}
              color="geekblue"
              onClick={() => handleWordClick(word)}
            >
              {word}
            </Tag>
          ))}
          <Input value={inputValue} />
        </div>
        {notificationMessage && (
          <Notification message={notificationMessage} type={notificationType} />
        )}
      </div>
    </Card>
  );
};

export default CardCheck;
