import React from "react";
import styled from "styled-components";

// styled
const CustomInput = styled.input`
  color: ${({ theme }) => theme.text};
  font-size: 1.6rem;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.text};
  padding: 0 0 0.5rem 0.5rem;
  transition: all .2s ease;

  &::placeholder {
      color: ${({ theme }) => theme.text};
      transition: all .2s ease;
  }

  &:focus {
    border-color: #FFCE00;
    transition: all .2s ease;
  }
`;

const Input = (props) => {
  return (
    <CustomInput
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      onBlur={props.onBlur}
    />
  );
};

export default Input;
