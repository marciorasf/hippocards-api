import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import colors from "../../assets/styles/colors";

export const Title = styled.header`
  text-transform: uppercase;

  > p:first-child {
    font-size: 1.5em;
    color: white;
  }

  > p:last-child {
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;
    color: ${colors.secondary};
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Link = styled((props) => <RouterLink {...props} />)`
  color: ${colors.secondary};
`;
