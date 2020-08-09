import styled from 'styled-components'
import CustomTextarea from '../../components/CustomTextarea'
import { TextareaBlock as CustomTextareaBlock } from "../../components/CustomTextarea/styles"
import CustomButton from '../../components/CustomButton'

import colors from "../../assets/styles/colors"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Content = styled.main`
  width: 75%;
`

export const QuestionTextarea = styled(CustomTextarea)`
  > textarea{
    height: 10rem;
  }
`

export const AnswerTextarea = styled(CustomTextarea)`
  margin-top: 4rem;

  > textarea{
    height: 20rem;
  }
`

export const ButtonsContainer = styled.div`
  width: 100%;
  margin-top: 4.8rem;
  display: flex;
  justify-content: space-between;
`

const Button = styled(CustomButton)`
  width: 48%;
`

export const CancelButton = styled(Button)`
  color: ${colors.secondary};
`

export const AddCardButton = styled(Button)`
  color: ${colors.textInSecondary};
  background-color: ${colors.secondary};
`
