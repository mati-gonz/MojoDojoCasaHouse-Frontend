import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MapsButton from '../../components/mapsButton'

describe('Maps Button Component', () => {
  beforeEach(() => {
    const mockOriginAddress = 'Av. Pdte. Kennedy 9351, Las Condes, Región Metropolitana'
    const mockDestinationAddress = 'Av. Pdte. Kennedy 5413, 372 a, Vitacura, Las Condes, Región Metropolitana'
    render(<MapsButton originAddress={mockOriginAddress} destinationAddress={mockDestinationAddress} />)
  })

  it('should be in the document', () => {
    const mapsButton = screen.getByRole('button', { name: /¿Cómo llegar?/i })
    expect(mapsButton).toBeInTheDocument()
  })

  it(' should handle a click', () => {
    window.open = jest.fn()
    window.open.mockClear()

    const mapsButton = screen.getByRole('button', { name: /¿Cómo llegar?/i })
    fireEvent.click(mapsButton)

    expect(window.open).toHaveBeenCalled()
  })
})
