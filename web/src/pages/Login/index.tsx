import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CustomInput from "../../components/CustomInput";
import Divider from "../../components/Divider";
import { Notify } from "../../hooks/Notify";
import AuthService from "../../services/AuthService";
import { Container, Content, SubmitButton, Title, Link, LinksContainer } from "./styles";

const blankFormData = {
  email: "",
  password: "",
};

function Login() {
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
      console.log({ error });
      Notify.error("Sorry! Could not login.");
    }
  }

  function verifyIfIsAuthenticated() {
    if (AuthService.isAuthenticated()) {
      history.push("/");
    }
  }

  useEffect(() => {
    verifyIfIsAuthenticated();
  }, []);

  return (
    <Container>
      <Content>
        <Title>
          <p>Log in</p>
          <p>Flashcards</p>
        </Title>

        <Divider height="8.8rem" />

        <form onSubmit={handleSubmit}>
          <CustomInput name="email" label="Email" type="email" onChange={handleInputChange} />

          <Divider height="3.2rem" />

          <CustomInput
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
          />

          <Divider height="1.2rem" />

          <LinksContainer>
            <Link to="/register">Create an account</Link>
          </LinksContainer>

          <Divider height="4.8rem" />

          <SubmitButton type="submit">Log in</SubmitButton>
        </form>
      </Content>
    </Container>
  );
}

export default Login;
