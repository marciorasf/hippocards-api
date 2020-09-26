import styled from "styled-components";

const CustomIconButton = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0.5em;
  font-weight: 500;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default CustomIconButton;
