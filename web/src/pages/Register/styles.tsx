import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import colors from "../../assets/styles/colors";
import CustomButton from "../../components/CustomButton";

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.header`
  text-transform: uppercase;

  > p:first-child {
    font-size: 1.75em;
    color: white;
  }

  > p:last-child {
    margin-top: 1rem;
    font-size: 2.5rem;
    font-weight: bold;
    color: ${colors.secondary};
  }
`;

export const Content = styled.main`
  width: 75%;
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Link = styled((props) => <RouterLink {...props} />)`
  color: ${colors.secondary};
`;

export const SubmitButton = styled(CustomButton)`
  width: 100%;
  height: 3.0rem;
  color: ${colors.textInSecondary};
  background-color: ${colors.secondary};
`;
