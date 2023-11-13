// En HelpMenu.js
import { useState, useEffect } from 'react'
import '../assets/styles/components/helpMenu.css'

const HelpMenu = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [hasClickedButton, setHasClickedButton] = useState(false)

  const showTooltip = () => {
    if (!hasClickedButton) {
      setTooltipVisible(true)
    }
  }

  const toggleMenu = () => {
    setHasClickedButton(true)
    setMenuVisible(!menuVisible)
    setTooltipVisible(false)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      showTooltip()
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
      <div className="boton-ayuda-container">
        {tooltipVisible && <div className="tooltip visible">¿Necesitas ayuda?</div>}
        <div className={`menu-lateral ${menuVisible ? 'visible' : ''}`}>
          <button className='closeButton' onClick={() => setMenuVisible(false)}> x </button>
          <h2>¡Bienvenido al menú de ayuda!</h2>
            <p>PelisCerca busca recomendarte los cines más cercanos para ver la película que quieras.</p>
            <p>1. Ingresa una dirección o utiliza tu ubicación actual para encontrar los cines más cercanos.</p>
            <p>2. Escoge la película que quieres ver dentro de las películas que hay actualmente en cartelera.</p>
        </div>
        <div className="boton-ayuda" onClick={toggleMenu} onMouseEnter={showTooltip}>
  ?
</div>
      </div>
  )
}

export default HelpMenu
