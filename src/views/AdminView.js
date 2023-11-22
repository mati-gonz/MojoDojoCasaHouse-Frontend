import { useState, useEffect } from 'react'
import '../assets/styles/views/adminView.css'
import axios from 'axios'
import cinemaTableData from '../data/cinemaTableData'
import showTableData from '../data/showTableData'
import DatabaseTable from '../components/databaseTable'

const AdminView = () => {
  const [state, setState] = useState(true)
  const [cinemas, setCinemas] = useState()
  const [shows, setShows] = useState()
  const [pending, setPending] = useState(true)

  const backendUrl = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    const updateCoordinate = async (data) => {
      data.forEach(cinema => {
        cinema.latitude = cinema.location.coordinates[0]
        cinema.longitude = cinema.location.coordinates[1]
      })
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/cinemas`)
        await updateCoordinate(response.data)
        setCinemas(response.data)
        setPending(false)
      } catch (error) {
        console.error('Error al obtener los cines', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/shows`)
        setShows(response.data)
      } catch (error) {
        console.error('Error al obtener las funciones', error)
      }
    }

    fetchData()
  }, [])

  const handleScrapeButtonClick = async () => {
    try {
      await axios.post(`${backendUrl}/api/scrape`)
    } catch (error) {
      alert('Error al correr el scraper')
    }
  }

  const clickCinemaButton = () => {
    setState(true)
  }

  const clickShowButton = () => {
    setState(false)
  }
  const cinemaProps = {
    name: 'Cinema',
    data: cinemas,
    columns: cinemaTableData,
    defaultSort: 'id',
    pending
  }
  const showsProps = {
    name: 'Show',
    data: shows,
    columns: showTableData,
    defaultSort: 'id_cinema',
    pending
  }

  return (
    <div className="landingLayout">
      <div className='databaseButtonContainer'>
        <button className='databaseButton' onClick={(e) => { clickCinemaButton() }}>cinema</button>
        <button className='databaseButton' onClick={(e) => { clickShowButton() }}>show</button>
        <button id='scraperButton' className='databaseButton' onClick={handleScrapeButtonClick} >Correr Scrapper</button>
      </div>
      <div id="cinema">
        {state
          ? (<div className='DataTable'>
            <DatabaseTable props={cinemaProps}/>
          </div>)
          : (<div className='DataTable'>
              <DatabaseTable props={showsProps}/>
          </div>)}
      </div>
    </div>
  )
}

export default AdminView
