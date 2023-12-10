import { useRef, useEffect } from 'react'
import '../assets/styles/components/searchForm.css'

// eslint-disable-next-line react/prop-types
const AutoCompleteField = ({ name, onChange, onBlur, useCurrentLocation, setFieldValue }) => {
  const autoCompleteRef = useRef()
  const inputRef = useRef()
  const options = {
    componentRestrictions: { country: 'cl' },
    fields: ['address_components', 'geometry', 'name'],
    types: ['address']
  }

  useEffect(() => {
    if (inputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      )
      autoCompleteRef.current.addListener('place_changed', async function () {
        const place = await autoCompleteRef.current.getPlace()
        if (place && place.geometry) {
          setFieldValue(
            'location',
            `Latitude: ${place.geometry.location.lat()}, Longitude: ${place.geometry.location.lng()}`
          )
        } else {
          console.error('Error: No se pudo obtener la ubicación del lugar seleccionado.')
        }
      })
    }
  }, [inputRef.current])
  return (
    <input
    name={name}
    onChange={onChange}
    onBlur={onBlur}
    disabled={useCurrentLocation}
    ref={inputRef}
    className='inputField'
    placeholder='Ingresa una ubicación'
    />
  )
}
export default AutoCompleteField
