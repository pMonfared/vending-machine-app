import React from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const Button: React.FC<{
  children?: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return <ButtonStyles onClick={onClick}>{children}</ButtonStyles>;
};

export default Button;
