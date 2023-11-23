import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CinemasMap from '../components/cinemasMap'
import SideBarInfo from '../components/sideBarInfo'
import '../assets/styles/views/nearbyCinemas.css'

const NearbyCinemas = () => {
  const [clickedCinema, setClickedCinema] = useState(null)
  const location = useLocation()
  const { postResponse, currentLocation, movieDate } = location.state || {}
  const splitLocation = currentLocation.split(',')
  const userLat = parseFloat(splitLocation[0].replace('Latitude: ', ''))
  const userLong = parseFloat(splitLocation[1].replace('Longitude: ', ''))

  const center = {
    lat: userLat,
    lng: userLong
  }

  return (
    <div className='nearbyLayout'>
      {postResponse[0].length > 0
        ? (
          <CinemasMap center={center} movieInfo={postResponse} clickedCinema={clickedCinema} onClickedCinema={setClickedCinema} />
          )
        : (
          <div className='notFound'>
            <h2>Ups! No se encontraron funciones para esta fecha</h2>
            <p> Intenta con otro día u otro cine </p>
          </div>
          )}
      {postResponse[0].length > 0
        ? (
          <SideBarInfo postInfo={postResponse} clickedCinema={clickedCinema} onClickedCinema={setClickedCinema} dateOfMovie={movieDate} currentLocation={currentLocation} />
          )
        : (
            null
          )
      }
    </div>
  )
}

export default NearbyCinemas
