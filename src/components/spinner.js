import '../assets/styles/components/animations.css'

function Spinner ({ small }) {
  return (
      <div className="spinner-container">
        <div className={small ? 'smallSpinner' : 'spinner'}></div>
      </div>
  )
}

export default Spinner
