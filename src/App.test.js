import { render, screen } from '@testing-library/react'
import App from './App'

test('renders "Hola Mundo" on landing page', () => {
  render(<App />)
  const greetingElement = screen.getByText(/hola mundo esto es una demo/i)
  expect(greetingElement).toBeInTheDocument()
})
