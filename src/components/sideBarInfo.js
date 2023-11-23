import { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/styles/components/sideBarInfo.css'
import { useNavigate } from 'react-router-dom'
import Spinner from './spinner'

const SideBarInfo = ({ postInfo, clickedCinema, onClickedCinema, dateOfMovie, currentLocation }) => {
  const movieName = postInfo[1]
  const [addresses, setAddresses] = useState([])
  const avalibleCinemas = postInfo[0]
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const geocoder = new window.google.maps.Geocoder()
  const movieDate = new Date(dateOfMovie)
  const parsedDate = `${movieDate.getDate()}/${movieDate.getMonth()}/${movieDate.getFullYear()}`

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
      <h2>Cines Disponibles para ver:</h2>
      <h3>{movieName}</h3>
      {clickedCinema
        ? (
            cinemaData
              ? (
              <div className='selectedCinema'>
                <h3>{clickedCinema.name}</h3>
                <img className='moviePicture' src={`${cinemaData.shows[0].link_to_picture}`} />
                <h4>Horarios para el día {parsedDate}</h4>
                <ul className='showInfo'>
                {cinemaData.shows.map((show, index) => (
                  <li key={index}>{show.schedule}</li>
                ))}
                </ul>
                <div className='buttonsContainer'>
                  <button className='moreInformationButton' onClick={handleMoreInformationClick}>Más información</button>
                  <button className='backButton' onClick={() => onClickedCinema(null)}>Volver</button>
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
