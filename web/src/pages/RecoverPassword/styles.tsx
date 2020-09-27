import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const Title = styled.header`
  text-transform: uppercase;

  > p {
    font-size: 1.5em;
    color: ${colors.secondary};
  }
`;
