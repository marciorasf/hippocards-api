import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const TextareaBlock = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    color: ${colors.textInPrimary};
    margin-bottom: 0.5em;
  }

  > textarea {
    width: 100%;
    height: 10rem;
    min-height: 5rem;
    border-radius: 0.25rem;
    background-color: ${colors.bgLighter};
    outline: 0;
    border: 0;
    resize: vertical;
    padding: 1rem;
    font-size: 1rem;
  }
`;
