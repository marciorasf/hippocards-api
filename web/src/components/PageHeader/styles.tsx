import styled from "styled-components";

import colors from "../../assets/styles/colors";
import { pageMaxWidth } from "../../assets/styles/global";

export const Header = styled.header`
  width: 100%;
  min-height: 12rem;
  max-height: 12rem;
  background-color: ${colors.primaryDark};
  padding: 2.4rem;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: ${pageMaxWidth};
  display: flex;
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  text-transform: uppercase;

  a {
    color: ${colors.textInPrimary};
  }
`;

export const Brand = styled.h1`
  justify-self: flex - start;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;

  svg {
    color: ${colors.textInPrimary};
  }
`;

export const MenuList = styled.ul`
  display: flex;

  ${MenuItem} + ${MenuItem} {
    margin-left: 1.6rem;
  }
`;
