import React, { FunctionComponent } from "react";
import CreatableSelect from "react-select/creatable";

import { styles, theme, SelectBlock } from "./styles";

interface CustomSelectProps {
  name: string;
  label: string;
  onChange: (key: string, value: any) => void;
  options?: any;
  className?: string;
}

const CustomSelect: FunctionComponent<CustomSelectProps> = ({
  name,
  label,
  onChange,
  options,
  className,
  ...rest
}: CustomSelectProps) => {
  return (
    <SelectBlock className={className}>
      <label htmlFor={name}>{label}</label>
      <CreatableSelect
        id={name}
        isClearable={true}
        onChange={(value) => onChange(name, value)}
        options={options}
        styles={styles}
        placeholder=""
        theme={theme}
        {...rest}
      />
    </SelectBlock>
  );
};

export default CustomSelect;
