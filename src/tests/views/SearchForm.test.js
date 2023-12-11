import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import SearchForm from '../../components/searchForm'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'

afterEach(cleanup)

global.google = {
  maps: {
    places: {
      Autocomplete: function () {
        return {
          addListener: jest.fn()
        }
      },
      event: {
        addListener: jest.fn()
      }
    }
  }
}

global.navigator.geolocation = {
  getCurrentPosition: jest.fn()
}

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('SearchForm component', () => {
  it('renders without crashing', () => {
    // Renderiza el componente y verifica que no se caiga
    const mockMovies = ['Movie1', 'Movie2']

    // Render the component using shallow rendering
    const wrapper = shallow(
      <Router>
        <SearchForm movies={mockMovies} />
      </Router>
    )

    // Assert that the component rendered successfully
    expect(wrapper.exists()).toBe(true)
  })

  it('Rellena y envía el formulario sin errores', async () => {
    const sendForm = jest.fn()

    render(
      <Router>
        <SearchForm sendForm={sendForm} movies={['Película 1', 'Película 2', 'Película 3']} />
      </Router>
    )

    await act(async () => {
      fireEvent.change(document.querySelector('input[placeholder="Ingresa una ubicación"]'), {
        target: { value: 'Arturo Fernandez 006, Ovalle, Chile' }
      })

      fireEvent.click(document.getElementById('currentLocation'))

      // Select a movie
      fireEvent.change(document.querySelector('input[placeholder="Buscar película"]'), {
        target: { value: 'Película 1' }
      })

      fireEvent.change(document.querySelector('input[id="date"]'), {
        target: { value: '31/12/2023' }
      })

      // console.log('Date Input Value:', document.querySelector('input[id="date"]').value)

      fireEvent.click(document.querySelector('button[type="submit"]'))
    })

    // Wait for the form submission to complete
    setTimeout(() => {
      expect(sendForm).toHaveBeenCalledWith(
        {
          location: 'Arturo Fernandez 006, Ovalle, Chile',
          movie: 'Película 1',
          date: '31/12/2023',
          currentLocation: true
        },
        expect.anything()
      )
    }, 1000)
  })
})
