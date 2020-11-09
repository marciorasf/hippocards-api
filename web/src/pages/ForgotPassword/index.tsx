import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import { PageContent, MainContainer } from "../../assets/styles/global";
import CustomInput from "../../components/CustomInput";
import Divider from "../../components/Divider";
import { Notify } from "../../hooks/Notify";
import api from "../../services/api";
import handleError from "../../services/ErrorHandler";
import { Title, Description } from "./styles";

const ERRORS = {
  USER_NOT_FOUND: "User not found!",
};

export default function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setEmail(value);
  }

  async function handleRecoverPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitDisabled(true);

    try {
      await api.get("/recover-password", { params: { email } });
      Notify.success("Email sent! You will be redirected to the login page.");

      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      const errorCode = error?.response?.data?.message as "USER_NOT_FOUND";
      const errorMessage = ERRORS[errorCode];
      handleError(error, errorMessage);
    } finally {
      setSubmitDisabled(false);
    }
  }

  return (
    <PageContent>
      <MainContainer>
        <Title>Recover your password</Title>

        <Divider height="3rem" />

        <Description>
          An email with a new password will be sent to you.
          <Divider height="0.5rem" />
          You can change the password after the login.
        </Description>

        <Divider height="2.0rem" />

        <form onSubmit={handleRecoverPassword} autoComplete="on">
          <CustomInput
            name="email"
            label="Email"
            type="email"
            required
            onChange={handleEmailChange}
          />

          <Divider height="3.0rem" />

          <Button
            color="secondary"
            size="large"
            variant="contained"
            fullWidth
            disabled={submitDisabled}
            type="submit"
          >
            Send email
          </Button>
        </form>
      </MainContainer>
    </PageContent>
  );
}
