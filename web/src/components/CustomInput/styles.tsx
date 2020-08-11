import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    color: ${colors.textInPrimary};
  }

  > input {
    width: 100%;
    height: 4.8rem;
    margin-top: 0.8rem;
    border-radius: 0.4rem;
    background-color: ${colors.bgLighter};

    outline: 0;
    border: 0;
    resize: vertical;
    padding: 1.6rem;
    font-size: 1.6rem;
  }
`;
