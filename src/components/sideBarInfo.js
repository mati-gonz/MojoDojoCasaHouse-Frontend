import { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/styles/components/sideBarInfo.css'
import { useNavigate } from 'react-router-dom'
import Spinner from './spinner'
import MapsButton from './mapsButton'

const SideBarInfo = ({ postInfo, clickedCinema, onClickedCinema, dateOfMovie, currentLocation, currentLocationCenter }) => {
  const movieName = postInfo[1]
  const avalibleCinemas = postInfo[0]
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const geocoder = new window.google.maps.Geocoder()
  const movieDate = new Date(dateOfMovie)
  const parsedDate = `${movieDate.getDate()}/${movieDate.getMonth()}/${movieDate.getFullYear()}`
  const [currentUserAddress, setCurrentUserAddress] = useState('')
  const [uniqueShowTimes, setUniqueShowTimes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    geocoder.geocode({
      location: {
        lat: currentLocationCenter.lat,
        lng: currentLocationCenter.lng
      }
    })
      .then((response) => {
        setCurrentUserAddress(response.results[0].formatted_address)
      })
  }, [avalibleCinemas])

  const [cinemaData, setCinemaData] = useState(null)

  useEffect(() => {
    if (clickedCinema) {
      const fetchData = async () => {
        try {
          const response = await axios.post(`${backendUrl}/movieInfo`, {
            cinema_id: clickedCinema.id,
            movie_title: movieName
          })

          setCinemaData(response.data)
        } catch (error) {
          console.error('Error al obtener los datos del cine', error)
        }
      }

      fetchData()
    }
  }, [clickedCinema])

  useEffect(() => {
    if (cinemaData && cinemaData.shows) {
      const targetDate = movieDate.toISOString().split('T')[0]

      const showsOnTargetDate = cinemaData.shows.filter((show) => {
        const showDate = new Date(show.date).toISOString().split('T')[0]
        return showDate === targetDate
      })

      const newUniqueShowTimes = [...new Set(showsOnTargetDate.map((show) => show.schedule))]

      newUniqueShowTimes.sort((a, b) => new Date(`1970-01-01T${a}`) - new Date(`1970-01-01T${b}`))

      setUniqueShowTimes(newUniqueShowTimes)
    }
  }, [cinemaData])

  const CinemaLabel = ({ cinema }) => {
    const handleCinemaClick = () => {
      onClickedCinema(cinema)
    }
    return (
      <div className='cinemaLabel' onClick={handleCinemaClick}>
          <h3>{cinema.name}</h3>
          <p>{cinema.address}</p>
      </div>
    )
  }

  const handleMoreInformationClick = () => {
    navigate('/movieInfo', {
      state: {
        cinemaId: cinemaData.cinema.id,
        movieTitle: movieName,
        movieDate: dateOfMovie,
        currentLocation,
        postInfo
      }
    })
  }

  return (
    <div className='sideBarContainer'>
      <h3>Cines Disponibles para ver: {movieName} </h3>
      {clickedCinema
        ? (
            cinemaData && uniqueShowTimes.length > 0
              ? (
              <div className='selectedCinema'>
                <h3>{clickedCinema.name}</h3>
                <img className='moviePicture' src={`${cinemaData.shows[0].link_to_picture}`} />
                <h4>Horarios para el día {parsedDate}</h4>
                <ul className='showInfo'>
                {uniqueShowTimes
                  .map((showTime, index) => (
                    <li key={index}>{`${showTime.split(':')[0]}:${showTime.split(':')[1]} hrs.`}</li>
                  ))}
                </ul>
                <MapsButton originAddress={currentUserAddress} destinationAddress={clickedCinema.address} />
                <div className='buttonsContainer'>
                  <button className='moreInformationButton' onClick={handleMoreInformationClick}>Más información</button>
                  <button className='sideBarBackButton' onClick={() => onClickedCinema(null)} >Volver</button>
                </div>
              </div>
                )
              : <Spinner small={false} />
          )
        : (
          <div className='labelsContainer'>
            {avalibleCinemas.map((cinema, index) => (
              <CinemaLabel cinema={cinema} index={index} key={index} />
            ))}
          </div>
          )}
    </div>
  )
}

export default SideBarInfo
