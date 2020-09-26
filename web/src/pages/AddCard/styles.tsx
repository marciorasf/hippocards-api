import styled from "styled-components";

import CustomTextarea from "../../components/CustomTextarea";

export const QuestionTextarea = styled(CustomTextarea)`
  > textarea {
    height: 6rem;
  }
`;

export const AnswerTextarea = styled(CustomTextarea)`
  > textarea {
    height: 12rem;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button:first-child {
    margin-right: 0.5rem;
  }

  button:last-child {
    margin-left: 0.5rem;
  }
`;
