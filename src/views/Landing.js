import '../assets/styles/views/landing.css'
import SearchForm from '../components/searchForm'

const Landing = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
  } else {
    console.log('Geolocation not supported')
  }

  function success (position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
  }

  function error () {
    console.log('Unable to retrieve your location')
  }
  return (
    <div className='landingLayout'>
        <div className='elementsContainers'>
            <h1>PelisCerca</h1>
            <SearchForm />
        </div>
    </div>
  )
}

export default Landing
