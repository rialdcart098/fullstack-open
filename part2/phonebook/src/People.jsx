import {useState} from 'react'
import axios from 'axios'
import personService from './components/persons'

const url = `http://localhost:3001/persons`
const People  = ({ setPersons, persons, filterText }) => {


    const removeButton = id => {
        personService
            .remove(id)
            .then(() =>
                setPersons(newPersons => newPersons.filter(person => person.id !== id))
            )
    }
        // axios
        //     .delete(`${url}/${id}`)
        //     .then(() => {
        //         setPersons(newPersons => newPersons.filter(person => person.id !== id))
        //     })

    return (
        <ul>
            {persons.filter(person => person && person.name.toLowerCase().includes(filterText.toLowerCase()))
                .map(person => (
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => removeButton(person.id)}>remove</button>
                </li>
            ))}
        </ul>
    )
}
export default People