import { useState, useEffect } from 'react'
import '../assets/styles/components/sideBarInfo.css'

const SideBarInfo = ({ postInfo, onClickedCinema }) => {
  const movieName = postInfo[1]
  const [addresses, setAddresses] = useState([])
  const avalibleCinemas = postInfo[0]
  const geocoder = new window.google.maps.Geocoder()

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

  return (
    <div className='sideBarContainer'>
      <h2>Cines Disponibles para ver: {movieName}</h2>
      <div className='labelsContainer'>
        {avalibleCinemas.map((cinema, index) => (
          <CinemaLabel cinema={cinema} index={index} key={index} />
        ))}
      </div>
    </div>
  )
}

export default SideBarInfo
