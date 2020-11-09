import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const InputBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  > label {
    color: ${colors.textInPrimary};
    margin-bottom: 0.5em;
  }

  > input {
    width: 100%;
    height: 3rem;
    border-radius: 0.25rem;
    background-color: ${colors.bgLighter};
    outline: 0;
    border: 0;
    resize: vertical;
    padding: 1rem;
    font-size: 1rem;
  }

  > span {
    position: absolute;
    bottom: 8px;
    right: 12px;
    cursor: pointer;
    color: #555;
  }
`;
