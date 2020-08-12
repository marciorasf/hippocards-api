import styled from "styled-components";

import colors from "./colors";

const breakpoint = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${breakpoint.mobileS})`,
  mobileM: `(min-width: ${breakpoint.mobileM})`,
  mobileL: `(min-width: ${breakpoint.mobileL})`,
  tablet: `(min-width: ${breakpoint.tablet})`,
  laptop: `(min-width: ${breakpoint.laptop})`,
  laptopL: `(min-width: ${breakpoint.laptopL})`,
  desktop: `(min-width: ${breakpoint.desktop})`,
  desktopL: `(min-width: ${breakpoint.desktop})`,
};

export const pageMaxWidth = "400px";

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.primary};
  flex-direction: column;
  display: flex;
  align-items: center;
`;

export const PageContent = styled.section`
  flex: 1;
  max-width: ${pageMaxWidth};
  width: calc(100% - 4.8rem);
  padding: 8rem 0;
`;

export const MainContainer = styled.main`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;
