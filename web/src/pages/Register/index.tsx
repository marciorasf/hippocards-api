import React, { useState, FormEvent, ChangeEvent } from "react";

import CustomInput from "../../components/CustomInput";
import Divider from "../../components/Divider";
import api from "../../services/api";
import { Container, Content, SubmitButton, Title } from "./styles";

const blankFormData = {
  email: "",
  password: "",
};

function Register() {
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
      await api.post("/user", formData);
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <Container>
      <Content>
        <Title>
          <p>Register on</p>
          <p>Flashcards</p>
        </Title>

        <Divider height="8.8rem" />

        <form onSubmit={handleSubmit}>
          <CustomInput name="email" label="Email" onChange={handleInputChange}></CustomInput>

          <Divider height="3.2rem" />

          <CustomInput name="password" label="Password" type="password" onChange={handleInputChange}></CustomInput>

          <Divider height="4.8rem" />

          <SubmitButton type="submit">Register</SubmitButton>
        </form>
      </Content>
    </Container>
  );
}

export default Register;
