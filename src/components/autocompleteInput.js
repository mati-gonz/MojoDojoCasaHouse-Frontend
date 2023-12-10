// MovieAutocomplete.js
import { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import '../assets/styles/components/movieAutocomplete.css'

const MovieAutocomplete = ({ movies, setFieldValue }) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const renderSuggestion = (suggestion, { query }) => {
    const matches = AutosuggestHighlightMatch(suggestion, query)
    const parts = AutosuggestHighlightParse(suggestion, matches)

    return (
      <div>
        {parts.map((part, index) => (
          <span
            key={index}
            className={part.highlight ? 'highlight' : null}
          >
            {part.text}
          </span>
        ))}
      </div>
    )
  }

  const getSuggestions = inputValue => {
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : movies.filter(movie =>
        movie.toLowerCase().includes(inputValue.toLowerCase())
      )
  }

  const inputProps = {
    placeholder: 'Buscar película',
    value,
    onChange: (_, { newValue }) => setValue(newValue)
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(getSuggestions(value))
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={value => value}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={(_, { suggestion }) =>
        setFieldValue('movie', suggestion)
      }
    />
  )
}

export default MovieAutocomplete
