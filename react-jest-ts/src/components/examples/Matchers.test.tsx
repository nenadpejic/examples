import { screen } from '@testing-library/react'

test("if input elements rendered correctly", () => {
  const passwordEl_v1 = screen.getByLabelText("Password *")
  const passwordEl_v2 = screen.getByPlaceholderText(/password/i)
})
