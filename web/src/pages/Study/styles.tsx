import styled from "styled-components";

import colors from "../../assets/styles/colors";
import CustomButton from "../../components/CustomButton";
import CustomIconButton from "../../components/CustomIconButton";

export const FilterButton = styled(CustomIconButton)`
  color: ${colors.secondary};

  & > svg {
    margin-right: 1rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
  width: 100%;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: ${colors.bgLighter};
`;

export const CardTitle = styled.div`
  display: flex;
  padding: 1rem;
  font-weight: 500;
  justify-content: space-between;
`;

export const CardContent = styled.div`
  min-height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const CardText = styled.div`
  cursor: default;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.5em;
  background-color: ${colors.bgLight};
`;

export const LeftIconButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const IconButton = styled(CustomIconButton)`
  + button {
    margin-left: 0.5em;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RightButton = styled(CustomButton)`
  height: initial;
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

export const AddButton = styled(CustomButton)`
  color: ${colors.secondary};
  width: 100%;
`;

export const NextButton = styled(CustomButton)`
  margin-left: 1.25rem;
  background-color: ${colors.secondary};
  color: ${colors.textInSecondary};
  width: 100%;
  border: 1px solid ${colors.secondary};
`;

export const ModalContent = styled.div`
  background-color: ${colors.primary};
  padding: 2rem;
  border-radius: 0.25rem;
`;

export const ModalTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const OkButton = styled(CustomButton)`
  width: 100%;
  color: ${colors.textInSecondary};
  background-color: ${colors.secondary};
`;
