import React, { useState } from "react";
import { Card, Progress, message } from "antd";
import { FireFilled, FireTwoTone } from "@ant-design/icons";
import "./style.scss";
import CardCheck from "./CardCheck";
import { set } from "react-hook-form";
const grammarData = {
  tense: "Present Simple",
  structure: "Subject + Verb (base form)",
  examples: [
    "I love you",
    "She plays tennis",
    "They work hard",
    "He reads books",
    "We travel often",
  ],
};
const GrammarLearning = () => {
  const [step, setStep] = useState(0);
  const totalExamples = grammarData.examples.length;
  const completed = (step / totalExamples) * 100;
  const handleSuccess = () => {
    if (step < totalExamples) {
      setStep(step + 1);
    } else {
      console.log("vaoday");
      setStep(totalExamples);
      // alert("🎉 Hoàn thành khóa học!");
    }
  };
  return (
    <div className="grammar-container">
      <div style={{ display: "flex", position: "relative", width: "100%" }}>
        <Progress percent={completed} showInfo={false} strokeColor="orange" />
        <FireTwoTone
          style={{
            color: "red",
            position: "absolute",
            left: `${completed}%`,
            transform: "translateX(-50%)",
            fontSize: 20,
          }}
        />
      </div>
      <CardCheck
        example={
          step < grammarData.examples.length ? grammarData.examples[step] : ""
        } // Chuyển sang câu tiếp theo
        onSuccess={handleSuccess} // Khi đúng, tăng step
        structure={grammarData.structure}
        tense={grammarData.tense}
      />
    </div>
  );
};
export default GrammarLearning;
