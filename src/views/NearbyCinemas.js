import { useLocation } from 'react-router-dom'
import CinemasMap from '../components/cinemasMap'
import SideBarInfo from '../components/sideBarInfo'
import '../assets/styles/views/nearbyCinemas.css'

const NearbyCinemas = () => {
  const location = useLocation()
  const { postResponse, currentLocation } = location.state || {}
  const splitLocation = currentLocation.split(',')
  const userLat = parseFloat(splitLocation[0].replace('Latitude: ', ''))
  const userLong = parseFloat(splitLocation[1].replace('Longitude: ', ''))

  const center = {
    lat: userLat,
    lng: userLong
  }

  return (
    <div className='nearbyLayout'>
      {postResponse
        ? (
          <CinemasMap center={center} movieInfo={postResponse} />
          )
        : (
        <p>Loading...</p>
          )}
      <SideBarInfo postInfo={postResponse} />
    </div>
  )
}

export default NearbyCinemas
