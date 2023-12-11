import { useEffect, useState } from 'react'
import '../assets/styles/views/landing.css'
import SearchForm from '../components/searchForm'
import HelpMenu from '../components/helpMenu'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const [movies, setMovies] = useState([])
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const navigate = useNavigate()

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

  const handleNavigate = () => {
    navigate('/adminView')
  }

  return (
    <div className='landingLayout'>
        <HelpMenu />
        <div className='elementsContainers'>
            <h1>PelisCerca</h1>
            <SearchForm movies={movies} />
            <br/>
            <button className='adminButton' onClick={handleNavigate}>Ingreso Administrador</button>
        </div>
    </div>
  )
}

export default Landing
