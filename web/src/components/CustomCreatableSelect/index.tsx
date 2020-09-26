import React, { FunctionComponent } from "react";
import CreatableSelect from "react-select/creatable";

import { styles, theme, SelectBlock } from "./styles";

interface CustomCreatableSelectProps {
  name: string;
  label: string;
  onChange: (key: string, value: any) => void;
  options?: any;
  className?: string;
}

const CustomCreatableSelect: FunctionComponent<CustomCreatableSelectProps> = ({
  name,
  label,
  onChange,
  options,
  className,
  ...rest
}: CustomCreatableSelectProps) => {
  return (
    <SelectBlock className={className}>
      <label htmlFor={name}>{label}</label>
      <CreatableSelect
        id={name}
        isClearable={true}
        onChange={(value) => onChange(name, value)}
        options={options}
        styles={styles}
        placeholder="Type to create category"
        theme={theme}
        {...rest}
      />
    </SelectBlock>
  );
};

export default CustomCreatableSelect;
