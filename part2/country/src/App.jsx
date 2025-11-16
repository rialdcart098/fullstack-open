import { useState, useEffect } from 'react'
import Results from './Results'
import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
function App() {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    if (countries.length === 0) {
      axios
        .get(url)
        .then(response => {
          setCountries(response.data)
        })
    }

  }, [])
  const [query, setQuery] = useState('')

  const handleChange = e => {
    setQuery(e.target.value)
  }

  return(
    <div>
      find countries <input type='search' id='search' value={query} onChange={handleChange} />
      <br />
      <Results countries={countries} setQuery={setQuery} query={query} />
    </div>
  )
}

export default App