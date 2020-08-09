import styled from "styled-components";
import colors from "../../assets/styles/colors"

const AddCardFab = styled.button`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  background-color: ${colors.secondary};
  padding: 1.2rem 3.2rem;
  border: 0;
  border-radius: 100rem;
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
`

export default AddCardFab
