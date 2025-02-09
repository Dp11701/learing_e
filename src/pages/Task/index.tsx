import React, { useState } from "react";
import Flashcard from "../../components/Card/Flashcard";
import { Button, Spin, Alert } from "antd";
import "./style.scss";
import { updateWord, useTasks } from "../../api/task";
import OTPInput from "../../components/Input/OTP";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

const TaskPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: words, isLoading, error } = useTasks();
  const [showInput, setShowInput] = useState(false);

  const handleNext = () => {
    setShowInput(true);
  };
  const mutation: UseMutationResult<any, Error, any> = useMutation({
    mutationFn: (data: any) => updateWord(data),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(
      { word: data },
      {
        onSuccess: (response) => {
          if (response.status === "success") {
            console.log("Registration successful:", response.message);
          } else {
            console.log("Registration failed:", response.message);
          }
        },
        onError: (error: Error) => {
          console.log("Registration failed:", error.message);
        },
      }
    );
  };

  const handleSuccess = () => {
    onSubmit(words[currentIndex].word || {"word":"any"})
    setShowInput(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (words as any).length);
  };

  const handlePrev = () => {
    setShowInput(false);
  };

  if (isLoading) return <Spin />;
  if (error) return <Alert message="Failed to load tasks" type="error" />;
  if (!words || words.length === 0)
    return <Alert message="No words available" type="info" />;

  

  return (
    <div className="task-page">
      {!showInput && (
        <Flashcard
          word={words[currentIndex].word}
          phonetic={words[currentIndex].phonetic}
          meaning={words[currentIndex].meaning}
          example={words[currentIndex].example}
        />
      )}
      {showInput && (
        <OTPInput
          length={words[currentIndex].word.length}
          word={words[currentIndex].word}
          onSuccess={handleSuccess}
        />
      )}
      <div
        className="navigation-buttons"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        {showInput ? (
          <Button onClick={handlePrev}>Quay lại</Button>
        ) : (
          <Button onClick={handleNext}>Từ tiếp theo</Button>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
