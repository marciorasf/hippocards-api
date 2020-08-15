import styled from "styled-components";

import { pageMaxWidth } from "../../assets/styles/global";

export const ModalContainer = styled.section`
  z-index: -1;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  > main {
    width: 100%;
    max-width: ${pageMaxWidth};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }

  &.isOpen {
    z-index: 3;
  }
`;
