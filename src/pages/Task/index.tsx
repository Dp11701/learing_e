import React, { useState } from "react";
import Flashcard from "../../components/Card/Flashcard";
import { Button, Spin, Alert } from "antd";
import "./style.scss";
import { useTasks } from "../../api/task";
import { mockData } from "./mockData";
import OTPInput from "../../components/Input/OTP";

const TaskPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: words, isLoading, error } = useTasks();
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const handleNext = () => {
    setShowInput(true);
  };

  const handleSuccess = () => {
    setShowInput(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (mockData?.length || 1));
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (mockData?.length || 1)) % (mockData?.length || 1)
    );
  };

  // if (isLoading) return <Spin />;
  // if (error) return <Alert message="Failed to load tasks" type="error" />;

  if (!mockData || mockData.length === 0)
    return <Alert message="No words available" type="info" />;

  return (
    <div className="task-page">
      {mockData && mockData.length > 0 && (
        <Flashcard
          word={mockData[currentIndex].word}
          phonetic={mockData[currentIndex].phonetic}
          meaning={mockData[currentIndex].meaning}
          example={mockData[currentIndex].example}
        />
      )}
      <div className="navigation-buttons">
        <Button onClick={handlePrev}>Từ trước đó</Button>
        <Button onClick={handleNext}>Từ tiếp theo</Button>
      </div>
      {showInput && (
        <OTPInput
          length={mockData[currentIndex].word.length}
          word={mockData[currentIndex].word}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default TaskPage;
