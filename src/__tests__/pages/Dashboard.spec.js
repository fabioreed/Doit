import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import Dashboard from "../../pages/Dashboard"
import api from "../../services/api"
import MockAdapter from "axios-mock-adapter"

const apiMock = new MockAdapter(api)

describe("Dashboard Page", () => {
  it("should be able to sign in", async () => {
    apiMock.onGet("/tasks").replyOnce(200, [
      {
        id: 1,
        completed: false,
        created_at: '2021-10-05T17:16:18.1982',
        description: 'Fazer as compras',
        userId: 13
      }
    ])

    render(<Dashboard authenticated />)
    
    const cards = screen.getByTestId('tasks-container')

    await waitFor(() => {
      expect(cards).toHaveTextContent("Fazer as compras")
    })
  })
})