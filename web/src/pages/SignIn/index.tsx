import React, { useState, FormEvent, ChangeEvent } from "react"

import CustomInput from "../../components/CustomInput"
import { Container, Content, SubmitButton, Title } from "./styles"
import AuthService from "../../services/AuthService"
import Divider from "../../components/Divider"

import { useHistory } from "react-router-dom"

const blankFormData = {
  email: "",
  password: ""
}

function SignIn() {
  const history = useHistory();
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

    try {
      await AuthService.login(formData)
      history.push("/")
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <Container>
      <Content>
        <Title>
          <p>
            Sign in on
          </p>
          <p>
            Flashcards
          </p>
        </Title>

        <Divider height="8.8rem" />

        <form onSubmit={handleSubmit}>
          <CustomInput name="email" label="Email" type="email" onChange={handleInputChange}></CustomInput>

          <Divider height="3.2rem" />

          <CustomInput name="password" label="Password" type="password" onChange={handleInputChange}></CustomInput>

          <Divider height="4.8rem" />

          <SubmitButton type='submit'>Sign in</SubmitButton>
        </form>
      </Content>
    </Container>
  )
}

export default SignIn
