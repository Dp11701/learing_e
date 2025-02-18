import React, { useState } from "react";
import { Card, Button, Progress, message } from "antd";
import "./style.scss";
import CardCheck from "./CardCheck";
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
  const [input, setInput] = useState<Array<any>>([]);
  const [completed, setCompleted] = useState(0);
  const handleWordClick = (word) => {
    setInput([...input, word]);
  };
  const handleSubmit = () => {
    const correct = grammarData.examples[step].split(" ");
    if (JSON.stringify(input) === JSON.stringify(correct)) {
      message.success("Correct! Well done!");
      setCompleted(((step + 1) / grammarData.examples.length) * 100);
      setStep(step + 1);
      setInput([]);
    } else {
      message.error("Incorrect! Try again.");
      // Add shake effect via CSS class
    }
  };
  return (
    <div className="grammar-container">
      <Progress percent={completed} showInfo={false} />
      <CardCheck
        example="aa aa aas sda"
        onSuccess={() => console.log("dung roi")}
        structure={grammarData.structure}
        tense={grammarData.tense}
      />
    </div>
  );
};
export default GrammarLearning;
