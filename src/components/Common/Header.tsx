import React from "react";
import styled from "styled-components";

const HeaderStyles = styled.header`
  background-color: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
`;

const Header: React.FC<{
  title?: string;
}> = ({ title }) => {
  return (
    <HeaderStyles>
      <h1>{title || "My App"}</h1>
    </HeaderStyles>
  );
};

export default Header;
