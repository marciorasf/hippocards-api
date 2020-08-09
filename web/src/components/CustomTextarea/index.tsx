import React, { FunctionComponent, InputHTMLAttributes } from "react"

import { TextareaBlock} from "./styles"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: FunctionComponent<InputProps> = ({ name, label, className, ...rest }) => {
  return (
    <TextareaBlock className={className}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} />
    </TextareaBlock>
  );
}

export default Input
