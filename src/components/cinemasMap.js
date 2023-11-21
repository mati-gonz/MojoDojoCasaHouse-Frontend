import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import '../assets/styles/components/cinemasMap.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const CinemasMap = ({ center, movieInfo }) => {
  const cinemasLocations = movieInfo[0]
  const movieName = movieInfo[1]

  const navigate = useNavigate()
  const [locationsReady, setLocationsReady] = useState(false)
  const [selectedCinema, setSelectedCinema] = useState(null)

  useEffect(() => {
    if (cinemasLocations && cinemasLocations.length > 0) {
      setLocationsReady(true)
    }
  }, [cinemasLocations])

  const color = {
    'google-blue 100': '#4285F4',
    'white 100': 'rgb(255,255,255)',
    'google-blue-dark 100': '#61a0bf',
    'google-blue-light 100': '#1bb6ff'
  }

  const blueDot = {
    fillColor: color['google-blue 100'],
    fillOpacity: 1,
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: color['white 100'],
    strokeWeight: 2
  }

  const handleMarkerClick = (cinema) => {
    navigate(`/cinema/${cinema.id}`, { state: { movie: movieName } }) // TODO: Esto es de mentira hay que ponerlo bien después
  }

  const handleMarkerOver = (cinema) => {
    setSelectedCinema(cinema)
  }

  const handleMarkerOut = () => {
    setSelectedCinema(null)
  }

  return (
    <div>
      {locationsReady
        ? (
        <GoogleMap
          mapContainerClassName='mapClass'
          zoom={13}
          center={center}
        >
          {cinemasLocations.map((cinema) => (
            <MarkerF
              key={cinema.id}
              onClick={() => handleMarkerClick(cinema)}
              onMouseOver={() => handleMarkerOver(cinema)}
              animation={window.google.maps.Animation.DROP}
              position={{
                lat: cinema.location.coordinates[0],
                lng: cinema.location.coordinates[1]
              }}
            />
          ))}
          {selectedCinema && (
            <InfoWindowF
              position={{
                lat: selectedCinema.location.coordinates[0],
                lng: selectedCinema.location.coordinates[1]
              }}
              options={{ pixelOffset: new window.google.maps.Size(0, -30) }} // Desplaza la ventana de información 30 píxeles hacia arriba
              onCloseClick={() => handleMarkerOut()}
            >
              <div>
                <h4>{selectedCinema.name}</h4>
              </div>
            </InfoWindowF>
          )}
          <MarkerF position={center} icon={blueDot} />
        </GoogleMap>
          )
        : (
        <p>Loading...</p>
          )}
    </div>
  )
}

export default CinemasMap
