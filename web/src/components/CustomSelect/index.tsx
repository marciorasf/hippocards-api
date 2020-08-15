import React, { FunctionComponent, ReactNode } from "react";
import CreatableSelect from "react-select/creatable";

import { styles, theme } from "./styles";

interface CustomSelectProps {
  name: string;
  options?: any;
  onChange: (key: string, value: any) => void;
}

const CustomSelect: FunctionComponent<CustomSelectProps> = ({
  options,
  onChange,
  name,
  ...rest
}: CustomSelectProps) => {
  return (
    <CreatableSelect
      isClearable={true}
      onChange={(value) => onChange(name, value)}
      options={options}
      styles={styles}
      placeholder=""
      theme={theme}
      {...rest}
    />
  );
};

export default CustomSelect;
