import styled from "styled-components"
import colors from "../../assets/styles/colors"

export const Header = styled.header`
  width: 100%;
  height: 12rem;
  background-color: ${colors.primaryDark};
  padding: 2.4rem;
  position: relative;


  > nav {
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size: 1.8rem;
    text-transform: uppercase;

    a {
      color: ${colors.textInPrimary}
    }

    > .brand {
      justify-self: flex-start;
    }

    ul {
      display: flex;

    }

    li {
      display: flex;
      align-items: center;

      a {

      }

      svg {
        color: ${colors.textInPrimary}
      }
    }

    li + li {
      margin-left: 1.6rem
    }
  }


`;
