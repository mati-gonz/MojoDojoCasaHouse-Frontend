import { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../assets/styles/components/searchForm.css'

const SearchForm = () => {
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [coordinates, setCoordinates] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  function success (position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setCoordinates(`Latitude: ${latitude}, Longitude: ${longitude}`)
  }

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  const handleLocationChange = async (event, setFieldValue) => {
    setUseCurrentLocation(event.target.checked)
    if (event.target.checked) {
      setIsGettingLocation(true)
      try {
        const position = await getCurrentPosition()
        success(position)
        setFieldValue('currentLocation', true)
      } catch (error) {
        console.error(error)
      }
      setIsGettingLocation(false)
    } else {
      setFieldValue('currentLocation', false)
      setCoordinates('')
      setFieldValue('ubication', '') // Restablece el valor de 'ubication' en el formulario
    }
  }

  const searchValidationSchema = Yup.object().shape({
    ubication: useCurrentLocation ? Yup.string() : Yup.string().required('Debes ingresar una ubicación'),
    movie: Yup.string().required('Debes elegir una película')
  })

  const sendForm = (values, { resetForm }) => {
    setIsSubmitting(true)

    try {
      if (useCurrentLocation) {
        values.ubication = coordinates
      } else if (values.ubication === '') {
        alert('Debes ingresar una ubicación')
        setIsSubmitting(false)
        return
      }
      console.log(values)
      setIsSubmitting(false)
      resetForm()
    } catch (error) {
      setIsSubmitting(false)
      alert('Ocurrió un error al buscar funciones')
    }
  }

  return (
    <div>
        <div>
            <Formik
                initialValues = {{ ubication: '', movie: '', currentLocation: false }}
                validationSchema = {searchValidationSchema}
                onSubmit = {(values, { resetForm }) => sendForm(values, { resetForm })} >
                {({ isValid, dirty, setFieldValue }) => (
                    <Form ref={formRef} className='formFields'>

                        <label className='labelText'>Ingresa una ubicación (Calle, número)</label>
                        <Field className='inputField' type="input" name="ubication" disabled={useCurrentLocation} />
                        <ErrorMessage className='errorStyle' name="ubication" component="div"/>

                        <label>
                          <Field
                          type="checkbox"
                          id="currentLocation"
                          onChange={event => handleLocationChange(event, setFieldValue)}
                          checked={useCurrentLocation}
                          />
                          Utilizar mi ubicación actual
                        </label>

                        <label className='labelText'>¿Qué película quieres ver?</label>
                        <Field className='selectField' as="select" name="movie">
                            <option value="">Selecciona una película</option>
                            <option value="toy story">Toy Story</option>
                            <option value="buscando a nemo">Buscando a Nemo</option>
                            <option value="cars">Cars</option>
                        </Field>
                        <ErrorMessage className='errorStyle' name="movie" component="div"/>

                        <br/>
                        <button className='submitButton' disabled={isSubmitting || isGettingLocation || !(isValid && dirty)} type="submit">
                          {isSubmitting ? 'Buscando...' : isGettingLocation ? 'Obteniendo ubicación...' : 'Buscar funciones'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}

export default SearchForm
