import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const TextareaBlock = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    color: ${colors.textInPrimary};
    margin-bottom: 0.8rem;
  }

  > textarea {
    width: 100%;
    height: 16rem;
    min-height: 8rem;
    border-radius: 0.4rem;
    background-color: ${colors.bgLighter};
    outline: 0;
    border: 0;
    resize: vertical;
    padding: 1.6rem;
    font-size: 1.6rem;
  }
`;
