import styled from "styled-components";

import colors from "../../assets/styles/colors";

const AddCardFab = styled.button`
  background-color: ${colors.secondary};
  padding: 0.875rem;
  border: 0;
  border-radius: 100rem;
  font-size: 1.125rem;
  line-height: 0;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;

  svg {
    font-size: 1.5rem;
  }
`;

export default AddCardFab;
