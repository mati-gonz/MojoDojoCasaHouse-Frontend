/* eslint-disable react/prop-types */
import { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker, { registerLocale } from 'react-datepicker'
import axios from 'axios'
import '../assets/styles/components/searchForm.css'
import 'react-datepicker/dist/react-datepicker.css'
import AutoCompleteField from './autocompleteField'
import es from 'date-fns/locale/es'
import { useNavigate } from 'react-router-dom'
import BounceDots from './BounceDots'
import MovieAutocomplete from './autocompleteInput'

const SearchForm = ({ movies }) => {
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [coordinates, setCoordinates] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  registerLocale('es', es)
  const backendUrl = process.env.REACT_APP_BACKEND_URL
  const navigate = useNavigate()

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
      setFieldValue('location', '') // Restablece el valor de 'location' en el formulario
    }
  }

  const searchValidationSchema = Yup.object().shape({
    location: useCurrentLocation ? Yup.string() : Yup.string().required('Debes ingresar una ubicación'),
    date: Yup.date().required('Debes ingresar una fecha'),
    movie: Yup.string().required('Debes elegir una película')
  })

  const sendForm = async (values, { resetForm }) => {
    setIsSubmitting(true)

    try {
      if (useCurrentLocation) {
        values.location = coordinates
      } else if (values.location === '') {
        alert('Debes ingresar una ubicación')
        setIsSubmitting(false)
        return
      }

      const response = await axios.post(`${backendUrl}/search`, values)

      navigate('/nearbyCinemas', { state: { postResponse: response.data, currentLocation: values.location, movieDate: values.date } })

      setIsSubmitting(false)
      resetForm()
    } catch (error) {
      setIsSubmitting(false)
      alert('Ocurrió un error al enviar el formulario')
      console.error(error)
    }
  }

  return (
    <div>
        <div>
            <Formik
                initialValues = {{ location: '', movie: '', date: null, currentLocation: false }}
                validationSchema = {searchValidationSchema}
                onSubmit = {(values, { resetForm }) => sendForm(values, { resetForm })} >
                {({ isValid, dirty, setFieldValue }) => (
                    <Form ref={formRef} className='formFields'>

                        <label className='labelText'>Ingresa una ubicación (Calle, número)</label>
                        <Field name="location">
                          {({ field, form }) => (
                            <AutoCompleteField
                              {...field}
                              setFieldValue={form.setFieldValue}
                              useCurrentLocation={useCurrentLocation}
                            />
                          )}
                        </Field>
                        <ErrorMessage className='errorStyle' name="location" component='div' />

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
                        <Field name="movie">
                          {({ field, form }) => (
                            <MovieAutocomplete
                              {...field}
                              movies={movies}
                              setFieldValue={form.setFieldValue}
                            />
                          )}
                        </Field>
                        <ErrorMessage className='errorStyle' name="movie" component="div" />

                        <label className='labelText' >¿Cuándo quieres ir?</label>
                                <Field name="date" >
                                    {({ form, field }) => {
                                      const { setFieldValue } = form
                                      const { value } = field
                                      return (
                                            <DatePicker
                                                {...field}
                                                placeholderText='Elige una fecha'
                                                id={ 'date' }
                                                selected={value}
                                                onChange={val => setFieldValue('date', val)}
                                                minDate={new Date()}
                                                dateFormat='dd/MM/yyyy'
                                                showPopperArrow={false}
                                                wrapperClassName="formDateWrapper"
                                                className="formDate"
                                                locale={'es'}
                                                autoComplete='off' />

                                      )
                                    }}
                                </Field>
                                <ErrorMessage className='errorStyle' name="date" component='div' />

                        <button className='submitButton' disabled={isSubmitting || isGettingLocation || !(isValid && dirty)} type="submit">
                          {isSubmitting ? <BounceDots/> : isGettingLocation ? 'Obteniendo ubicación...' : 'Buscar funciones'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}

export default SearchForm
