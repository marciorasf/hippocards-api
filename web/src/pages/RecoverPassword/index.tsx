import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import { PageContent, MainContainer } from "../../assets/styles/global";
import CustomInput from "../../components/CustomInput";
import Divider from "../../components/Divider";
import { Notify } from "../../hooks/Notify";
import api from "../../services/api";
import { Title } from "./styles";

const ERRORS = {
  ERROR: "Something bad happened!",
  USER_NOT_FOUND: "User not found!",
};

export default function Login() {
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
      Notify.success("Email sended!");
    } catch (error) {
      const errorCode =
        (error?.response?.data?.message as "USER_NOT_FOUND") || "ERROR";
      const errorMessage = ERRORS[errorCode];
      Notify.error(errorMessage);
    } finally {
      setSubmitDisabled(false);
    }
  }

  return (
    <PageContent>
      <MainContainer>
        <Title>
          <p>Recover your password</p>
        </Title>

        <Divider height="5.0rem" />

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
