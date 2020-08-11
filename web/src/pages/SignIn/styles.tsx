import styled from 'styled-components'

import colors from "../../assets/styles/colors"
import CustomButton from '../../components/CustomButton'

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Title = styled.header`
  text-transform: uppercase;

  > p:first-child{
    font-size: 2.8rem;
    color: white;
  }

  > p:last-child{
    margin-top: 1.6rem;
    font-size: 3.4rem;
    font-weight: bold;
    color: ${colors.secondary};
  }
`

export const Content = styled.main`
  width: 75%;
`

export const SubmitButton = styled(CustomButton)`
  width: 100%;
  height: 4.8rem;
  color: ${colors.textInSecondary};
  background-color: ${colors.secondary};
`