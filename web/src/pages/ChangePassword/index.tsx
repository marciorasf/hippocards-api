import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import { PageContent, MainContainer } from "../../assets/styles/global";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import Divider from "../../components/Divider";
import { Notify } from "../../hooks/Notify";
import api from "../../services/api";
import handleError from "../../services/ErrorHandler";
import { Title } from "./styles";

export default function ChangePassword(props: any) {
  const { token } = props.match.params;

  const history = useHistory();

  const [newPassword, setNewPassword] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  function handleNewPasswordInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setNewPassword(value);
  }

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitDisabled(true);

    try {
      await api.put("/reset-password", { token, newPassword });

      Notify.success("Password changed! You will be redirect to login page.");

      setTimeout(() => {
        history.push("/login");
      }, 2000);
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitDisabled(false);
    }
  }

  return (
    <PageContent>
      <MainContainer>
        <Title>Recover your password</Title>

        <Divider height="3rem" />

        <form onSubmit={handleChangePassword} autoComplete="on">
          <CustomPasswordInput
            name="new-password"
            label="New password"
            required
            value={newPassword}
            onChange={handleNewPasswordInputChange}
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
            Change password
          </Button>
        </form>
      </MainContainer>
    </PageContent>
  );
}
