import React from "react";
import "./style.scss";

interface ICustomTagProps {
  text: string;
  color: string;
}

export const CustomTag = ({ text, color }: ICustomTagProps) => {
  return <div>CustomTag</div>;
};
