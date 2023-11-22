import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
import '../assets/styles/views/functions.css'

const Functions = () => {
  const [shows, setShows] = useState([])
  const [cinema, setCinema] = useState([])

  // const location = useLocation();
  // const cinemaId = location.state?.cinema.id; // Accede a cinema.id desde state
  // const movieName = location.state?.movie;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/movieInfo', {
          // cinema_id: cinemaId,
          // movie_title: movieName
        })

        setShows(response.data.shows)
        setCinema(response.data.cinema)
      } catch (error) {
        console.error('Error al obtener las funciones', error)
      } finally {
        const mockShowData = [
          {
            title: 'Barbie',
            schedule: '2023-11-17T11:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Barbie',
            schedule: '2023-11-17T12:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Barbie',
            schedule: '2023-11-17T15:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Barbie',
            schedule: '2023-11-18T11:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Barbie',
            schedule: '2023-11-19T11:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Barbie',
            schedule: '2023-11-19T15:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Barbie',
            schedule: '2023-11-17T16:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'Barbie',
            schedule: '2023-11-17T17:00:00',
            link_to_show: 'https://www.cinemark.cl/pelicula?tag=512&corporate_film_id=95303&coming_soon=false&pelicula=jdh-balada-de-pajaros-cantores&cine=cinemark_alto_las_condes',
            link_to_picture: 'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
            id_cinema: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]

        setShows(mockShowData)

        const mockCinemaData = [
          {
            name: 'Cinemark Alto Las Condes',
            location: {
              type: 'Point',
              coordinates: [-33.3911981, -70.5475219]
            },
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
        setCinema(mockCinemaData)
      }
    }
    fetchData()
  }, [])

  const getNameDay = (day) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    return days[day.getDay()]
  }

  const getNumberDay = (day) => day.getDate()

  const getMonth = (month) => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    return months[month.getMonth()]
  }

  const [selectedDay, setSelectedDay] = useState(null)
  const diasUnicos = Array.from(
    new Set(shows.map(show => new Date(show.schedule).setHours(0, 0, 0, 0)))
  ).map(timestamp => new Date(timestamp))

  return (
    <div className='functionsLayout'>
      {shows.length > 0
        ? (
        <div className='movieInformation'>
          <h1>{shows[0].title}</h1>
          <img src={shows[0].link_to_picture} alt={`Image for ${shows[0].title}`} className='frontPageMovie'/>
        </div>
          )
        : (
        <p>No hay datos disponibles</p>
          )}
      <div className='otherInformation'>
        <div className='functionsInformation'>
          {cinema.length > 0
            ? (
            <h1>{cinema[0].name}</h1>
              )
            : (
            <p></p>
              )}
        <div className='tableContainer'>
          <div className='daysContainer'>
            {diasUnicos.map((dia, index) => (
              <span
                key={index}
                className={`day ${selectedDay && dia.getTime() === selectedDay.getTime() ? 'selectedText' : ''}`}
                onClick={() => setSelectedDay(dia)}
              >
                  {getNameDay(dia)}<br />
                  {getNumberDay(dia)} de {getMonth(dia)}
              </span>
            ))}
          </div>
          <div className='functionsContainer'>
          {shows
            .filter(show => {
              const showDate = new Date(show.schedule)
              return selectedDay && showDate.toLocaleDateString() === selectedDay.toLocaleDateString()
            })
            .map((show, index) => (
              <div className='function' key={index}>
                <p className='hour'>{new Date(show.schedule).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} hrs.</p>
                <button className="buyButton" onClick={() => window.open(show.link_to_show, '_blank')}>Comprar</button>
              </div>
            ))}
          </div>
        </div>
        <br/>
          <button className='backButton'>
            Volver
          </button>
        </div>
    </div>
  </div>
  )
}

export default Functions
