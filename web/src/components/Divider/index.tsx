import styled from "styled-components";

interface DividerProps {
  readonly height: string;
}

const Divider = styled.span<DividerProps>`
  width: 100%;
  display: block;
  min-height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

export default Divider;
