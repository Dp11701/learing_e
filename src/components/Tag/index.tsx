import React from "react";
import { Tag } from "antd";
import "./style.scss";

interface ICustomTagProps {
  text?: string;
  color: string;
  onClick?: () => void;
}

export const CustomTag = ({ text, color, onClick }: ICustomTagProps) => {
  return (
    <Tag color={color} className="custom-tag" onClick={onClick}>
      {text}
    </Tag>
  );
};
