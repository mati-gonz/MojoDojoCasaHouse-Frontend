import { useState, useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../assets/styles/components/searchForm.css'

const SearchForm = () => {
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const searchValidationSchema = Yup.object().shape({
    ubication: Yup.string().required('Debes ingresar una ubicación'),
    movie: Yup.string().required('Debes elegir una película')
  })

  const sendForm = (values, { resetForm }) => {
    setIsSubmitting(true)

    try {
      console.log(values)
      setIsSubmitting(false)
      resetForm()
    } catch (error) {
      setIsSubmitting(false)
      alert('Ocurrió un error al enviar el correo')
    }
  }

  return (
    <div>
        <div>
            <Formik
                initialValues = {{ ubication: '', movie: '' }}
                validationSchema = {searchValidationSchema}
                onSubmit = {(values, { resetForm }) => sendForm(values, { resetForm })} >
                {({ isValid, dirty }) => (
                    <Form ref={formRef} className='formFields'>

                        <label>Ingresa una ubicación</label>
                        <Field type="input" name="ubication"/>
                        <ErrorMessage name="ubication" component="div"/>

                        <label>¿Qué película quieres ver?</label>
                        <Field as="select" name="movie">
                            <option value="">Selecciona una película</option>
                            <option value="toy story">Toy Story</option>
                            <option value="buscando a nemo">Buscando a Nemo</option>
                            <option value="cars">Cars</option>
                        </Field>
                        <ErrorMessage name="movie" component="div"/>

                        <button className='submitButton' disabled={isSubmitting || !(isValid && dirty)} type="submit">{isSubmitting ? 'Enviando...' : 'Enviar'}</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}

export default SearchForm
