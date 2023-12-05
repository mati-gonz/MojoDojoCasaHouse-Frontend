import '../assets/styles/components/mapsButton.css'
import mapsIcon from '../assets/imgs/google-maps.png'

const MapsButton = ({ originAddress, destinationAddress }) => {
  const handleButtonClick = () => {
    const destination = destinationAddress
    const origin = originAddress

    const travelMode = 'driving' // PUEDE SER 'driving', 'transit', 'walking', 'bicycling'

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const mapUrl = isMobile
      ? `https://maps.apple.com/?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}&dirflg=${travelMode}`
      : `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`

    window.open(mapUrl, '_blank')
  }

  return (
    <button className='mapsButton' onClick={handleButtonClick}>
      ¿Cómo llegar?
      <img className='icon' src={mapsIcon} alt="Google Maps Icon" />
    </button>
  )
}

export default MapsButton
