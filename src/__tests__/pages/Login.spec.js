/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import Login from "../../pages/Login"
import api from "../../services/api"
import MockAdapter from "axios-mock-adapter"

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children }) => children,
  useHistory: () => ({
    push: mockHistoryPush,
  })
}))

const apiMock = new MockAdapter(api)

describe("Login Page", () => {
  it("should be able to sign in", async () => {
    apiMock.onPost("/login").replyOnce(200, {})

    render(<Login authenticated={false} setAuthenticated={() => {}} />)
    
    const emailField = screen.getByPlaceholderText("Seu melhor email")
    const passwordField = screen.getByPlaceholderText("Uma senha bem segura")
    const buttonElement = screen.getByText("Enviar")

    fireEvent.change(emailField, { target: { value: "johndoe@example.com" }})
   
    fireEvent.change(passwordField, { target: { value: "123456789" }})
    
    fireEvent.click(buttonElement)

    await waitFor(() => {
      expect(emailField).toHaveValue("johndoe@example.com")
      expect(passwordField).toHaveValue("123456789")
      // eslint-disable-next-line no-undef
      expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard")
    })
  })
})
                
        