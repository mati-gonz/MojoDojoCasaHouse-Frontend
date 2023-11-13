import '../assets/styles/views/landing.css'
import SearchForm from '../components/searchForm'
import HelpMenu from '../components/helpMenu'

const Landing = () => {
  return (
    <div className='landingLayout'>
        <HelpMenu />
        <div className='elementsContainers'>
            <h1>PelisCerca</h1>
            <SearchForm />
        </div>
    </div>
  )
}

export default Landing
