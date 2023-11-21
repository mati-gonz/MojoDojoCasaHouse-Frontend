import '../assets/styles/components/sideBarInfo.css'

const SideBarInfo = ({ postInfo }) => {
//   const movieName = postInfo[1]
  const avalibleCinemas = postInfo[0]
  console.log(avalibleCinemas)
  const geocoder = new window.google.maps.Geocoder()
  avalibleCinemas.map((cinema) => (
    geocoder
      .geocode({
        location: {
          lat: cinema.location.coordinates[0],
          lng: cinema.location.coordinates[1]
        }
      })
      .then((response) => {
        console.log(response.results[0].formatted_address)
      })
  ))

  return (
        <div className='sideBarContainer'>
            <h1>Cines Disponibles</h1>
            {avalibleCinemas.map((cinema, index) => (
                <h3 key={index}>{cinema.name}</h3>
            ))}
        </div>
  )
}

export default SideBarInfo
