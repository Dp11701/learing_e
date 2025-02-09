import React, { useState, useEffect, useMemo } from "react";
import { notification } from "antd";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import type { NotificationArgsProps } from "antd";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Context = React.createContext({ name: "Default" });

const ConfettiNotification: React.FC<NotificationProps> = ({ message, type }) => {
  const [api, contextHolder] = notification.useNotification();
  const { width, height } = useWindowSize();
  const [prevMessage, setPrevMessage] = useState<string | null>(null);

  const openNotification = (placement: any) => {
    api[type]({
      message: type === "success" ? "Success" : "Error",
      description: <Context.Consumer>{() => message}</Context.Consumer>,
      placement,
    });
  };

  useEffect(() => {
    if (message !== prevMessage) {
      openNotification("topRight");
      setPrevMessage(message);
    }
  }, [message, type, prevMessage]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      {type === "success" && <Confetti width={width} height={height} />}
    </Context.Provider>
  );
};

export default ConfettiNotification;
