import React from "react";
import styled from "styled-components";

const FormInputStyles = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormInput: React.FC<{
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, type, placeholder, value, onChange }) => {
  return (
    <FormInputStyles
      type={type || "text"}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;
