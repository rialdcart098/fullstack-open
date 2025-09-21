const Results = ({countries, setQuery, query}) => {
    let result = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
    if (result.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (result.length === 1) {
        const country = result[0]
        return (
            <>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h2>Languages:</h2>
                <ul>
                    {Object.values(country.languages ?? {}).map(language =>
                        <li key={language}>{language}</li>
                    )}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}></img>
                <h2>Weather in {country.capital}</h2>
            </>
        )
    } else {
        return (
            <ul>
                {result.map(country =>
                    <li key={country.name.official}>
                        <p>{country.name.common}</p>
                        <button onClick={() => setQuery(country.name.common)}>show</button>
                    </li>
                )}
            </ul>
        )
    }
}

export default Results;