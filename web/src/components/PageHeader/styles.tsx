import styled from "styled-components";

import colors from "../../assets/styles/colors";
import { pageMaxWidth } from "../../assets/styles/global";

export const Header = styled.header`
  width: 100%;
  background-color: ${colors.primaryDark};
  padding: 1.25rem 2.5rem;
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
  text-transform: uppercase;

  a {
    color: ${colors.textInPrimary};
  }
`;

export const Brand = styled.h1`
  justify-self: flex - start;
  color: ${colors.secondary};
  font-weight: 500;
  font-size: 1.4rem;
  letter-spacing: 0.02rem;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${colors.textInPrimary};
  font-size: 1rem;

  svg {
    color: ${colors.textInPrimary};
  }
`;

export const MenuList = styled.ul`
  display: flex;

  ${MenuItem} + ${MenuItem} {
    margin-left: 1rem;
  }
`;

export const Buttons = styled.div`
  width: 100%;
  max-width: ${pageMaxWidth};
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
