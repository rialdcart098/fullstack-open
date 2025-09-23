import {useState} from 'react'
import './index.css'
import personService from './components/persons'

const PersonForm = ({ setCondition, persons, setPersons, setMessage }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChange = e => {
        setNewName(e.target.value)
    }
    const handleChangeNumber = e => setNewNumber(e.target.value)

    const addName = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName || person.number === newNumber)
        if (existingPerson) {
            const error = existingPerson.name === newName ? newName : newNumber
            if (window.confirm(`${error} exists. replace details?`)){
                const newObject = {name: newName, number: newNumber, id: String(Date.now())}
                personService
                    .update(existingPerson.id, newObject)
                    .then(res => {
                        setPersons(persons.map(person => person.id === existingPerson.id ? res : person))
                        setCondition(true)
                        setMessage(`Updated ${newName}`)
                        setTimeout(() => setMessage(''), 5000)
                    })
            }
            setNewName('')
            setNewNumber('')
        } else {
            const nameObject = {name: newName, number: newNumber, id: String(Date.now())}
            personService
                .addName(nameObject)
                .then(res => {
                    setPersons(persons.concat(res))
                    setCondition(true)
                    setMessage(`Added ${newName}!`)
                    setTimeout(() => setMessage(''), 5000)
                    setNewName('')
                    setNewNumber('')

                })
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