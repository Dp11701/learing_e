import React, { useState } from "react";
import { Card, Button, Typography } from "antd";
import { SwapOutlined, SoundOutlined } from "@ant-design/icons";
import "./style.scss";

interface FlashcardProps {
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
}

const Flashcard: React.FC<FlashcardProps> = ({
  word,
  phonetic,
  meaning,
  example,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRead = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  return (
    <Card
      className={`flashcard ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      {!isFlipped ? (
        <div className="front">
          <h2 className="word">{word}</h2>
          <p className="phonetic">{phonetic}</p>
          <Button
            className="flip-button"
            icon={<SwapOutlined />}
            onClick={handleFlip}
          />
          <Button
            className="read-button"
            icon={<SoundOutlined />}
            onClick={handleRead}
          />
        </div>
      ) : (
        <div className="back">
          <div className="meaning-wrapper">
            <Typography>Định nghĩa:</Typography>
            <p className="meaning">{meaning}</p>
          </div>

          <div className="meaning-wrapper">
            <Typography>Ví dụ:</Typography>
            <p className="example">{example}</p>
          </div>
          <Button
            className="flip-button"
            icon={<SwapOutlined />}
            onClick={handleFlip}
          />
        </div>
      )}
      <div className="footer_card"></div>
    </Card>
  );
};

export default Flashcard;
