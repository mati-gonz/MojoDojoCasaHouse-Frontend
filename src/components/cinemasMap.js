import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import '../assets/styles/components/cinemasMap.css'
import { useEffect, useState, useCallback, useRef } from 'react'

const CinemasMap = ({ center, movieInfo, clickedCinema, onClickedCinema }) => {
  const cinemasLocations = movieInfo[0]
  const [locationsReady, setLocationsReady] = useState(false)
  const [selectedCinema, setSelectedCinema] = useState(null)
  const [shouldStopAnimation, setShouldStopAnimation] = useState(false)
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldStopAnimation(true)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (cinemasLocations && cinemasLocations.length > 0) {
      setLocationsReady(true)
    }
  }, [cinemasLocations])

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panToNewCenter = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
  }, [])

  const handleMarkerClick = (cinema) => {
    onClickedCinema(cinema)
    panToNewCenter({
      lat: cinema.location.coordinates[0],
      lng: cinema.location.coordinates[1]
    })
  }

  const handleMarkerOver = (cinema) => {
    setSelectedCinema(cinema)
  }

  const handleMarkerOut = () => {
    setSelectedCinema(null)
  }

  const mapCenter = clickedCinema
    ? {
        lat: clickedCinema.location.coordinates[0],
        lng: clickedCinema.location.coordinates[1]
      }
    : center

  useEffect(() => {
    if (mapCenter && clickedCinema) {
      panToNewCenter({
        lat: clickedCinema.location.coordinates[0],
        lng: clickedCinema.location.coordinates[1]
      })
    }
  }, [mapCenter, clickedCinema])

  return (
    <div>
      {locationsReady
        ? (
        <GoogleMap
          mapContainerClassName='mapClass'
          zoom={13}
          center={mapCenter}
          onLoad={onMapLoad}
        >
          {cinemasLocations.map((cinema) => (
            <MarkerF
              key={cinema.id}
              onClick={() => {
                handleMarkerClick(cinema)
              }}
              onMouseOver={() => handleMarkerOver(cinema)}
              onMouseOut={handleMarkerOut}
              animation={window.google.maps.Animation.DROP}
              position={{
                lat: cinema.location.coordinates[0],
                lng: cinema.location.coordinates[1]
              }}
              options={{
                icon: {
                  path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  fillColor: clickedCinema && clickedCinema.id === cinema.id ? '#5bb200' : '#e51d27',
                  fillOpacity: 1,
                  scale: 9,
                  strokeColor: color['white 100'],
                  strokeWeight: 2
                }
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
            >
              <div>
                <h4>{selectedCinema.name}</h4>
              </div>
            </InfoWindowF>
          )}
          <MarkerF
            position={center}
            icon={blueDot}
            animation={
              shouldStopAnimation
                ? null
                : window.google.maps.Animation.BOUNCE }
            />
        </GoogleMap>
          )
        : (
        <p>Loading...</p>
          )}
    </div>
  )
}

export default CinemasMap
