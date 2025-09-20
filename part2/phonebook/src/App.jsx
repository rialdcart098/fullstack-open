import Filter from './Filter'
import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import People from './People'
import axios from 'axios'
import personService from './components/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    useEffect( () => {
        personService
            .load()
            .then(load => setPersons(persons.concat(load)))
    }, [])


    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    console.log(persons)
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                persons={persons}
                setPersons={setPersons}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
            />
            <h3>Numbers</h3>
            <People persons={persons} setPersons={setPersons} filterText={filter} />

        </div>
    )
}

export default App