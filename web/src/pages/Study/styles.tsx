import styled from "styled-components";

import { IconButton as MuiIconButton } from "@material-ui/core";

import colors from "../../assets/styles/colors";
import CustomIconButton from "../../components/CustomIconButton";

export const FiltersTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.secondaryLight};
`;

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

  &.is-answer {
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const CardText = styled.div`
  cursor: default;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5em;
  background-color: ${colors.bgLight};
`;

export const LeftIconButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const IconButton = styled(MuiIconButton)`
  svg {
    color: black;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button:first-child {
    margin-right: 0.5rem;
  }

  button:last-child {
    margin-left: 0.5rem;
  }
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
