import React from "react";
import { Button } from "antd";
import './style.scss'

interface CustomButtonProps {
  onClick: () => void;
  title: string;
}

const ButtonSubmit: React.FC<CustomButtonProps> = ({ onClick, title }) => {
  return (
    <Button onClick={onClick} className="button-submit">
      {title}
    </Button>
  );
};

export default ButtonSubmit;
