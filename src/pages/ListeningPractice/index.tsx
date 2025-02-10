import React, { useState } from "react";
import { Input, Button, Slider } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "./style.scss";

const ListeningPractice: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>(Array(6).fill(""));
  const [progress, setProgress] = useState(0);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="listening-practice-container">
      <div className="audio-section">
        <Button shape="circle" icon={<AudioOutlined />} size="large" />
        <Slider defaultValue={0} className="audio-slider" />
        <span>-07:06</span>
      </div>
      
      <div className="question-section">
        <h3>PRESTON PARK RUN</h3>
        <p>Complete the notes below. Write <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b> for each answer.</p>
        {answers.map((answer, index) => (
          <div className="question-item" key={index}>
            <div className="question-number">{index + 1}</div>
            <Input
              className="answer-input"
              value={answer}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      
      <div className="sidebar">
        <p>Thời gian làm bài:</p>
        <h2>07:56</h2>
        <Button className="submit-button">NỘP BÀI</Button>
      </div>
    </div>
  );
};

export default ListeningPractice;
