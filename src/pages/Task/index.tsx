import React, { useState } from "react";
import Flashcard from "../../components/Card/Flashcard";
import { Button, Spin, Alert } from "antd";
import "./style.scss";
import { useTasks } from "../../api/task";

const TaskPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: words, isLoading, error } = useTasks();
  console.log('aaa',words)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (words?.length || 1));
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (words?.length || 1)) % (words?.length || 1)
    );
  };

  if (isLoading) return <Spin />;
  if (error) return <Alert message="Failed to load tasks" type="error" />;

  if (!words || words.length === 0)
    return <Alert message="No words available" type="info" />;

  return (
    <div className="task-page">
      {words && words.length > 0 && (
        <Flashcard
          word={words[currentIndex].word}
          phonetic={words[currentIndex].phonetic}
          meaning={words[currentIndex].meaning}
          example={words[currentIndex].example}
        />
      )}
      <div className="navigation-buttons">
        <Button onClick={handlePrev}>Từ trước đó</Button>
        <Button onClick={handleNext}>Từ tiếp theo</Button>
      </div>
    </div>
  );
};

export default TaskPage;
