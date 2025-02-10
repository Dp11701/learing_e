import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  onClick: () => void;
  title: string;
  color: string;
  textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  title,
  color,
  textColor,
}) => {
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: color, color: textColor, minWidth: '6vw' }}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
