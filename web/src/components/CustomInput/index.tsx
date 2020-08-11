import React, { FunctionComponent, InputHTMLAttributes } from "react"

import { InputBlock } from "./styles"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: FunctionComponent<InputProps> = ({ name, label, className, ...rest }) => {
  return (
    <InputBlock className={className}>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} {...rest} />
    </InputBlock>
  );
}

export default Input
