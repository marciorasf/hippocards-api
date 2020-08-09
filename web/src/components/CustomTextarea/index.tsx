import React, { FunctionComponent, TextareaHTMLAttributes } from "react"

import { TextareaBlock} from "./styles"

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  name: string;
  label: string;
}

const Input: FunctionComponent<InputProps> = ({ name, label, className, ...rest }) => {
  return (
    <TextareaBlock className={className}>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} id={name} {...rest}/>
    </TextareaBlock>
  );
}

export default Input
