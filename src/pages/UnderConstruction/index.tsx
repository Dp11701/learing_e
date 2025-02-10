import React from "react";
import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SmileOutlined } from "@ant-design/icons";

const { Paragraph, Title } = Typography;

const UnderConstruction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f6d365, #fda085)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Result
        icon={<SmileOutlined style={{ fontSize: "80px", color: "#faad14" }} />}
        title={<Title level={2}>Tính năng đang được cập nhật! 🚀</Title>}
        subTitle={
          <Paragraph style={{ fontSize: "16px", color: "#555" }}>
            Bạn Phú giấu tên đang làm việc chăm chỉ để mang đến cho bạn một trải nghiệm tốt hơn.  
            Hãy quay lại sau nhé!  
          </Paragraph>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#fa541c",
              borderColor: "#fa541c",
              fontSize: "16px",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Về Trang Chủ
          </Button>
        }
      />
    </div>
  );
};

export default UnderConstruction;
