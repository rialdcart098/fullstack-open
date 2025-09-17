import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChange = e => {
        setNewName(e.target.value)
    }
    const handleChangeNumber = e => setNewNumber(e.target.value)

    const addName = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName || person.number === newNumber)) {
            alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
        } else {
            const nameInput = {name: newName, number: newNumber, id: persons.length + 1}
            setPersons(persons.concat(nameInput))
            console.log('name added', nameInput)
            setNewName('')
            setNewNumber('')
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>name: <input placeholder="Add name..." value={newName} onChange={handleChange} /></div>
                <div>number: <input placeholder="Add number..." value={newNumber} onChange={handleChangeNumber} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) =>
                    <li key={person.id}>{person.name} {person.number}</li>
                )}
            </ul>

        </div>
    )
}

export default App