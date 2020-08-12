import styled from "styled-components";

import colors from "../../assets/styles/colors";
import CustomIconButton from "../CustomIconButton";

export const Container = styled.nav<{ className?: string }>`
  background-color: ${colors.primary};
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: opacity 1;
  transform: scale(1);
  transform-origin: top right;
  transition: opacity ease-in 150ms;

  &.is-hidden {
    opacity: 0;
    transform: scale(0);
  }
`;

export const CloseButton = styled(CustomIconButton)`
  position: fixed;
  top: 2.4rem;
  right: 2.4rem;

  svg {
    color: ${colors.textInPrimary};
  }
`;

export const MenuList = styled.ul``;

export const MenuItem = styled.li`
  cursor: pointer;
  color: ${colors.textInPrimary};
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
`;
