import { useEffect, useState } from 'react'
import '../assets/styles/views/landing.css'
import SearchForm from '../components/searchForm'
import HelpMenu from '../components/helpMenu'
import axios from 'axios'

const Landing = () => {
  const [movies, setMovies] = useState([])
  const backendUrl = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/movies`)
        setMovies(response.data)
      } catch (error) {
        console.error('Error al obtener las películas', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='landingLayout'>
        <HelpMenu />
        <div className='elementsContainers'>
            <h1>PelisCerca</h1>
            <SearchForm movies={movies} />
            <br/>
            <p>Eres un&nbsp;
            <a href='adminView'>administrador</a>
            ?
            </p>
        </div>
    </div>
  )
}

export default Landing
