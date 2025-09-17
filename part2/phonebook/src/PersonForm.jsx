import {useState} from 'react'

const PersonForm = ({ newName, newNumber, persons, setPersons, setNewName, setNewNumber }) => {
    const handleChange = e => {
        setNewName(e.target.value)
    }
    const handleChangeNumber = e => setNewNumber(e.target.value)

    const addName = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName || person.number === newNumber)
        if (existingPerson) {
            const error = existingPerson.name === newName ? newName : newNumber
            alert(`${error} is already added to phonebook`)
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
        <form onSubmit={addName}>
            <div>name: <input placeholder="Add name..." value={newName} onChange={handleChange} /></div>
            <div>number: <input placeholder="Add number..." value={newNumber} onChange={handleChangeNumber} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm