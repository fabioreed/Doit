import { render, screen } from '@testing-library/react'
import Input from '../../components/Input'

describe('Input Component', () => {
  test('shoul be able to render an input', () => {
    render(
      <Input error='' name='Email' placeholder='Email' register={() => {}} />
    )
    expect(screen.getByPlaceholderText("Email")).toBeTruthy()
  })
})