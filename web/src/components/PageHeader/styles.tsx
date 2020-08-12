import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const Header = styled.header`
  width: 100%;
  height: 12rem;
  background-color: ${colors.primaryDark};
  padding: 2.4rem;
  position: relative;
`;

export const Nav = styled.nav`
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
