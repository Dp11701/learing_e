import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Noti/Notification";
import "./style.scss";
import { CustomTag } from "../../components/Tag";
interface OTPInputProps {
  example: string;
  tense: string;
  structure: string;
  onSuccess: () => void;
}
interface WordTag {
  word?: string;
  index: number;
}
// Hàm xáo trộn thứ tự từ trong câu
const shuffleArray = (array: WordTag[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
const CardCheck: React.FC<OTPInputProps> = ({
  example,
  onSuccess,
  tense,
  structure,
}) => {
  const navigate = useNavigate();
  // Kiểm tra nếu `example` rỗng => Hiển thị màn hình hoàn thành
  if (!example || example.trim() === "") {
    return (
      <Card className="grammar-card complete">
        <h2>🎉 Bạn đã hoàn thành khóa học hôm nay!</h2>
        <p>Hãy quay lại vào ngày mai để học thêm nhé.</p>
        <Button type="primary" onClick={() => navigate("/")}>
          Quay về Trang chủ
        </Button>
      </Card>
    );
  }
  const words = example.split(" ").map((word, index) => ({ word, index }));
  const [inputWords, setInputWords] = useState<WordTag[]>([]);
  const [availableTags, setAvailableTags] = useState<WordTag[]>(
    shuffleArray(words)
  );
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [shake, setShake] = useState(false);
  const [correct, setCorrect] = useState(false);
  // Reset khi câu mới được truyền vào
  useEffect(() => {
    console.log("example", example);
    setInputWords([]);
    setAvailableTags(shuffleArray(words));
    setNotificationMessage("");
    setCorrect(false);
  }, [example]);
  useEffect(() => {
    const currentInput = inputWords.map((tag) => tag.word).join(" ");
    if (availableTags.length > 0) {
      return;
    }
    if (currentInput === example) {
      setNotificationMessage("🎉 Correct! Well done!");
      setNotificationType("success");
      setCorrect(true);
      setTimeout(() => {
        onSuccess(); // Chuyển sang câu tiếp theo
      }, 1000);
    } else if (inputWords.length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [inputWords, example, onSuccess]);
  const handleTagClick = (wordTag: WordTag) => {
    setInputWords([...inputWords, wordTag]);
    setAvailableTags(
      availableTags.filter((tag) => tag.index !== wordTag.index)
    );
  };
  const handleInputClick = (wordTag: WordTag) => {
    setInputWords(inputWords.filter((tag) => tag.index !== wordTag.index));
    setAvailableTags(
      [...availableTags, wordTag].sort((a, b) => a.index - b.index)
    ); // Giữ thứ tự ban đầu
  };
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
          <div style={{ display: "flex", marginBottom: 20 }}>
            {availableTags.map((tag) => (
              <CustomTag
                key={tag.index}
                color="geekblue"
                text={tag.word}
                onClick={() => handleTagClick(tag)}
              />
            ))}
          </div>
          <div className="grammar-card-input">
            {inputWords.map((wordTag, index) => (
              <span
                key={wordTag.index}
                className="input-word"
                onClick={() => handleInputClick(wordTag)}
              >
                {wordTag.word}
                {index < inputWords.length - 1 && " / "}
              </span>
            ))}
          </div>
        </div>
        {notificationMessage && (
          <Notification message={notificationMessage} type={notificationType} />
        )}
      </div>
    </Card>
  );
};
export default CardCheck;
