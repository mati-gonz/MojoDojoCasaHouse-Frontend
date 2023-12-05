import { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/styles/components/sideBarInfo.css'
import { useNavigate } from 'react-router-dom'
import Spinner from './spinner'
import MapsButton from './mapsButton'

const SideBarInfo = ({ postInfo, clickedCinema, onClickedCinema, dateOfMovie, currentLocation, currentLocationCenter }) => {
  const movieName = postInfo[1]
  const [addresses, setAddresses] = useState([])
  const avalibleCinemas = postInfo[0]
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const geocoder = new window.google.maps.Geocoder()
  const movieDate = new Date(dateOfMovie)
  const parsedDate = `${movieDate.getDate()}/${movieDate.getMonth()}/${movieDate.getFullYear()}`
  const [currentUserAddress, setCurrentUserAddress] = useState('')
  const [uniqueShowTimes, setUniqueShowTimes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    Promise.all(
      avalibleCinemas.map((cinema) =>
        geocoder.geocode({
          location: {
            lat: cinema.location.coordinates[0],
            lng: cinema.location.coordinates[1]
          }
        }).then((response) => response.results[0].formatted_address)
      )
    ).then(setAddresses)

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
    // Asegúrate de que cinemaData.shows está definido y no es nulo
    if (cinemaData && cinemaData.shows) {
      // Utiliza el estado anterior para calcular el nuevo estado
      setUniqueShowTimes(prevUniqueShowTimes => {
        // Crea un nuevo conjunto con los horarios únicos
        const newUniqueShowTimes = [...new Set(cinemaData.shows.map((show) => show.schedule))]
        // Ordena los horarios
        newUniqueShowTimes.sort((a, b) => new Date(`1970-01-01T${a}`) - new Date(`1970-01-01T${b}`))
        // Devuelve el nuevo estado
        return newUniqueShowTimes
      })
    }
  }, [cinemaData])

  const CinemaLabel = ({ cinema, index }) => {
    const handleCinemaClick = () => {
      onClickedCinema(cinema)
    }
    return (
      <div className='cinemaLabel' onClick={handleCinemaClick}>
          <h3>{cinema.name}</h3>
          <p>{addresses[index]}</p>
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
                    <li key={index}>{showTime}</li>
                  ))}
                </ul>
                <MapsButton originAddress={currentUserAddress} destinationAddress={addresses[avalibleCinemas.indexOf(clickedCinema)]} />
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
