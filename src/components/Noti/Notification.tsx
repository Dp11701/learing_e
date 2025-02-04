import React, { useMemo, useEffect } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Context = React.createContext({ name: "Default" });

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: any) => {
    api[type]({
      message: type === "success" ? "Success" : "Error",
      description: <Context.Consumer>{() => message}</Context.Consumer>,
      placement,
    });
  };

  useEffect(() => {
    openNotification("topRight");
  }, [message, type]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
  );
};

export default Notification;
