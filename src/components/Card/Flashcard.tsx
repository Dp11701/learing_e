import React, { useState } from "react";
import { Card, Button } from "antd";
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
          <p className="meaning">{meaning}</p>
          <p className="example">{example}</p>
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
      )}
    </Card>
  );
};

export default Flashcard;
