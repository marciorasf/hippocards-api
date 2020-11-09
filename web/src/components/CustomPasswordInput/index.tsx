import React, { useState, FunctionComponent, InputHTMLAttributes } from "react";

import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@material-ui/icons";

import { InputBlock } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
}

const Input: FunctionComponent<InputProps> = ({
  name,
  label,
  className,
  ...rest
}: InputProps) => {
  const [displayPassword, setDisplayPassword] = useState(false);

  function togglePasswordVisibility() {
    setDisplayPassword(!displayPassword);
  }

  return (
    <InputBlock className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        type={displayPassword ? "text" : "password"}
        {...rest}
      />
      <span onClick={togglePasswordVisibility}>
        {displayPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </span>
    </InputBlock>
  );
};

export default Input;
