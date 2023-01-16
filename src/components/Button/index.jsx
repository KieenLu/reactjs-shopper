import React from "react";
import { ButtonStyled } from "./style";
import { LoadingOutlined } from "@ant-design/icons";

export const Button = ({ loading, children, ...props }) => {
  return (
    <ButtonStyled
      {...props}
      disabled={loading}
      className={`btn btn-sm btn-dark ${props.className ?? ""}`}
    >
      {loading && <LoadingOutlined style={{ marginRight: 15 }} />}
      {children}
    </ButtonStyled>
  );
};
