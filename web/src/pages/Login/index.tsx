import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import { Button, Link as MuiLink } from "@material-ui/core";

import { PageContent, MainContainer } from "../../assets/styles/global";
import CustomInput from "../../components/CustomInput";
import CustomPasswordInput from "../../components/CustomPasswordInput";
import Divider from "../../components/Divider";
import AuthService from "../../services/AuthService";
import handleError from "../../services/ErrorHandler";
import { Title, Link, LinksContainer } from "./styles";

const blankFormData = {
  email: "",
  password: "",
};

const ERRORS = {
  WRONG_PASSWORD: "Wrong password!",
  USER_NOT_FOUND: "User not found!",
};

export default function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState(blankFormData);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await AuthService.login(formData);
      history.push("/");
    } catch (error) {
      const errorCode = error?.response?.data?.message as
        | "USER_NOT_FOUND"
        | "WRONG_PASSWORD";
      const errorMessage = ERRORS[errorCode];
      handleError(error, errorMessage);
    }
  }

  return (
    <PageContent>
      <MainContainer>
        <Title>
          <p>Log in</p>
          <p>Flashcards</p>
        </Title>

        <Divider height="5.0rem" />

        <form onSubmit={handleSubmit} autoComplete="on">
          <CustomInput
            name="email"
            label="Email"
            type="email"
            required
            onChange={handleInputChange}
          />

          <Divider height="2rem" />

          <CustomPasswordInput
            name="password"
            label="Password"
            required
            onChange={handleInputChange}
          />

          <Divider height="1rem" />

          <LinksContainer>
            <MuiLink component={Link} to="/forgot-password" color="secondary">
              Forgot password?
            </MuiLink>
            <MuiLink component={Link} to="/register" color="secondary">
              Create an account
            </MuiLink>
          </LinksContainer>

          <Divider height="3.0rem" />

          <Button
            color="secondary"
            size="large"
            variant="contained"
            fullWidth
            type="submit"
          >
            Log in
          </Button>
        </form>
      </MainContainer>
    </PageContent>
  );
}
