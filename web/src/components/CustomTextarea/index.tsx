import React, { FunctionComponent, TextareaHTMLAttributes } from "react";

import { TextareaBlock } from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  className: string;
}

const Textarea: FunctionComponent<TextareaProps> = ({
  name,
  label,
  className,
  ...rest
}: TextareaProps) => {
  return (
    <TextareaBlock className={className}>
      <label htmlFor={name}>{label}</label>
      <textarea name={name} id={name} {...rest} />
    </TextareaBlock>
  );
};

export default Textarea;
