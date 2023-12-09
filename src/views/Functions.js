import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../assets/styles/views/functions.css'
import Spinner from '../components/spinner'

const Functions = () => {
  const [shows, setShows] = useState([])
  const [cinema, setCinema] = useState([])
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const location = useLocation()
  const { cinemaId, movieTitle, movieDate, currentLocation, postInfo } = location.state
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${backendUrl}/movieInfo`, {
          cinema_id: cinemaId,
          movie_title: movieTitle
        })
        setShows(response.data.shows)
        setCinema(response.data.cinema)
      } catch (error) {
        console.error('Error al obtener las funciones', error)
      }
    }
    fetchData()
  }, [])

  const getNameDay = (day) => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    return days[day.getDay()]
  }

  const getNumberDay = (day) => day.getDate()

  const getMonth = (month) => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    return months[month.getMonth()]
  }

  const [selectedDay, setSelectedDay] = useState(null)

  const uniqueDays = Array.from(
    new Set(shows.map(show => new Date(show.date).setHours(0, 0, 0, 0)))
  ).map(timestamp => new Date(timestamp))

  if (selectedDay === null && uniqueDays.length > 0) {
    setSelectedDay(uniqueDays[0])
  }

  const handleBackButton = () => {
    navigate('/nearbyCinemas', {
      state: {
        postResponse: postInfo,
        currentLocation,
        movieDate
      }
    })
  }

  return (
    <div className='functionsLayout'>
      {shows.length > 0
        ? (
        <><div className='movieInformation'>
          <h1>{shows[0].title}</h1>
          <img src={shows[0].link_to_picture} alt={`Image for ${shows[0].title}`} className='frontPageMovie' />
        </div><div className='otherInformation'>
            <div className='functionsInformation'>
                <h1>{cinema.name}</h1>
              <div className='tableContainer'>
                <div className='daysContainer'>
                  {uniqueDays
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((dia, index) => (
                    <span
                      key={index}
                      className={`day ${selectedDay && dia.getTime() === selectedDay.getTime() ? 'selectedText' : ''}`}
                      onClick={() => setSelectedDay(dia)}
                    >
                      {getNameDay(dia)}<br />
                      {getNumberDay(dia)} de {getMonth(dia)}
                    </span>
                    ))}
                </div>
                <div className='functionsContainer'>
                  {shows
                    .filter(show => {
                      const showDate = new Date(show.date)
                      const selectedDate = new Date(selectedDay)
                      return (
                        selectedDate.toDateString() === showDate.toDateString()
                      )
                    })
                    .sort((a, b) => {
                      const timeA = new Date('1970-01-01T' + a.schedule)
                      const timeB = new Date('1970-01-01T' + b.schedule)
                      return timeA - timeB
                    })
                    .map((show, index) => (
                      <div className='function' key={index}>
                        <p className='hour'>{show.schedule.split(':')[0]}:{show.schedule.split(':')[1]} hrs.</p>
                        <button className="buyButton" onClick={() => window.open(show.link_to_show, '_blank')}>Comprar</button>
                      </div>
                    ))}
                </div>
              </div>
              <br />
              <button className='backButton' onClick={handleBackButton}>
                Volver
              </button>
            </div>
          </div></>
          )
        : (
        <div className='loading'>
          <Spinner small={false} />
        </div>
          )}
  </div>
  )
}

export default Functions
