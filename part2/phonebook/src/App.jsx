import Filter from './Filter'
import { useState } from 'react'
import PersonForm from './PersonForm'
import People from './People'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
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
            <People persons={persons} filter={filter} />

        </div>
    )
}

export default App