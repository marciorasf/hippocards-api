import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    color: ${colors.textInPrimary};
    margin-bottom: 0.8rem;
  }
`;

export const styles = {
  control: (provided: any) => ({
    ...provided,
    "background-color": colors.bgLighter,
    height: "4.8rem",
    "border-radius": "0.4rem",
  }),
  menuList: (provided: any) => ({
    ...provided,
    "background-color": colors.bgLighter,
    "border-radius": "0.4rem",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ?? colors.textInSecondary,
  }),
};

export const theme = {
  borderRadius: 4,
  colors: {
    danger: "#DE350B",
    dangerLight: "#FFBDAD",
    neutral0: "hsl(0, 0%, 100%)",
    neutral5: "hsl(0, 0%, 95%)",
    neutral10: "hsl(0, 0%, 90%)",
    neutral20: "hsl(0, 0%, 80%)",
    neutral30: "hsl(0, 0%, 70%)",
    neutral40: "hsl(0, 0%, 60%)",
    neutral50: "hsl(0, 0%, 50%)",
    neutral60: "hsl(0, 0%, 40%)",
    neutral70: "hsl(0, 0%, 30%)",
    neutral80: "hsl(0, 0%, 20%)",
    neutral90: "hsl(0, 0%, 10%)",
    primary: colors.secondary,
    primary25: colors.bgLight,
    primary50: colors.secondaryLight,
    primary75: colors.secondary,
  },
  spacing: {
    baseUnit: 4,
    controlHeight: 48,
    menuGutter: 6,
  },
};
