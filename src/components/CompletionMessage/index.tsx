import React from "react";
import { Card, Button } from "antd";

interface CompletionMessageProps {
  onRestart: () => void;
}

const CompletionMessage: React.FC<CompletionMessageProps> = ({ onRestart }) => {
  return (
    <Card className="completion-message">
      <h2>🎉 Chúc mừng! 🎉</h2>
      <p>Bạn đã hoàn thành tất cả từ vựng của ngày hôm nay! 🎯</p>
      <Button type="primary" onClick={onRestart}>
        Quay lại trang chủ
      </Button>
    </Card>
  );
};

export default CompletionMessage;
