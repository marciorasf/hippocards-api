import React, { useState, FormEvent, ChangeEvent } from "react"

import CustomInput from "../../components/CustomInput"
import { Container, Content, SubmitButton, Title } from "./styles"
import api from "../../api"
import Divider from "../../components/Divider"

const blankFormData = {
  email: "",
  password: ""
}

function SignUp() {
  const [formData, setFormData] = useState(blankFormData)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post("/user", formData)
  }

  return (
    <Container>
      <Content>
        <Title>
          <p>
            Sign up for
          </p>
          <p>
            Flashcards
          </p>
        </Title>

        <Divider height="8.8rem" />

        <form onSubmit={handleSubmit}>
          <CustomInput name="email" label="Email" onChange={handleInputChange}></CustomInput>

          <Divider height="3.2rem" />

          <CustomInput name="password" label="Password" onChange={handleInputChange}></CustomInput>

          <Divider height="4.8rem" />

          <SubmitButton type='submit'>Sign up</SubmitButton>
        </form>
      </Content>
    </Container>
  )
}

export default SignUp
