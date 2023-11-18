import { GoogleMap, Marker, Circle } from '@react-google-maps/api'
import '../assets/styles/components/cinemasMap.css'
import { useNavigate } from 'react-router-dom'

const CinemasMap = ({ center, cinemasLocations }) => {
  const navigate = useNavigate()
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
    navigate(`/cinemas/${cinema.id}`) // TODO: Esto es de mentira hay que ponerlo bien después
  }

  return (
    <div>
      <GoogleMap
        mapContainerClassName='mapClass'
        zoom={14}
        center={center}
        >
          {cinemasLocations.map((cinema) => (
            <Marker
              key={cinema.id}
              onClick={handleMarkerClick}
              onMouseOver={(cinema) => console.log(cinema.name)}
              animation={window.google.maps.Animation.DROP}
              position={{
                lat: cinema.location.coordinates[0],
                lng: cinema.location.coordinates[1]
              }}
            />
          ))
          }
          <Marker position={center} icon={blueDot} />
          <Circle
            center={center}
            radius={20} // Radio en metros
            options={{
              strokeColor: color['google-blue-light 100'], // Color del borde del círculo (azul)
              strokeOpacity: 0.4,
              strokeWeight: 1,
              fillColor: color['google-blue-dark 100'], // Color de relleno del círculo (azul)
              fillOpacity: 0.4,
              zIndex: 1
            }}
          />
      </GoogleMap>
    </div>
  )
}

export default CinemasMap
