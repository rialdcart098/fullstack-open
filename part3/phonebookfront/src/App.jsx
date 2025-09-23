import Filter from './Filter'
import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import People from './People'
import Notification from './Notification'
import personService from './components/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState('')
    const [condition, setCondition] = useState(true)

    useEffect( () => {
        personService
            .load()
            .then(load => setPersons(load))
    }, [])
    if (persons.length === 0) return null

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} condition={condition} />
            <Filter filter={filter} setFilter={setFilter} />
            <h3>add a new</h3>
            <PersonForm
                setMessage={setMessage}
                persons={persons}
                setPersons={setPersons}
                setCondition={setCondition}
            />
            <h3>Numbers</h3>
            <People
                persons={persons}
                setPersons={setPersons}
                filterText={filter}
                setMessage={setMessage}
                setCondition={setCondition}
            />

        </div>
    )
}

export default App