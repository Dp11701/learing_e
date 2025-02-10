import React, { useState } from "react";
import Flashcard from "../../components/Card/Flashcard";
import CompletionMessage from "../../components/CompletionMessage";
import { Button, Spin, Alert } from "antd";
import "./style.scss";
import { updateWord, useTasks } from "../../api/task";
import OTPInput from "../../components/Input/OTP";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

const TaskPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: words, isLoading, error } = useTasks();
  const [showInput, setShowInput] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

  const handleNext = () => {
    setShowInput(true);
    setIsAnsweredCorrectly(false); // Reset trạng thái khi chuyển sang từ mới
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
            console.log("Update successful:", response.message);
          } else {
            console.log("Update failed:", response.message);
          }
        },
        onError: (error: Error) => {
          console.log("Update failed:", error.message);
        },
      }
    );
  };

  const handleSuccess = () => {
    onSubmit(words[currentIndex].word || { word: "any" });
    setShowInput(false);
    setIsAnsweredCorrectly(true); // Đánh dấu là người dùng đã nhập đúng

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setShowInput(false);
  };

  if (isLoading) return <Spin />;
  if (error) return <Alert message="Failed to load tasks" type="error" />;
  if (!words || words.length === 0)
    return <Alert message="No words available" type="info" />;

  return (
    <div className="task-page">
      {isCompleted ? (
        <CompletionMessage onRestart={handleRestart} />
      ) : (
        <>
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
          <div className="navigation-buttons">
            {showInput && !isAnsweredCorrectly && (
              <Button className="secondary" onClick={() => setShowInput(false)}>
                Go Back
              </Button>
            )}
            {!showInput && <Button onClick={handleNext}>Next Word</Button>}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskPage;
