import {useState} from 'react'
import axios from 'axios'
import personService from './components/persons'

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
            const nameObject = {name: newName, number: newNumber, id: String(Date.now())}
            personService
                .addName(nameObject)
                .then(res => {
                    setPersons(persons.concat(res))
                    setNewName('')
                })

            // axios
            //     .post('http://localhost:3001/persons', nameInput)
            //     .then(res => {
            //         setPersons(persons.concat(res.data))
            //         setNewName('')
            //     })
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