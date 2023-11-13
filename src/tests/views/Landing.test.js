import { render, screen } from '@testing-library/react'
import Landing from '../../views/Landing'

test('renders landing page correctly', () => {
  render(<Landing />)
  const titleElement = screen.getByText(/PelisCerca/i)
  expect(titleElement).toBeInTheDocument()
})
