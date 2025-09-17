import {useState} from 'react'

const People  = ({ persons, filter }) => 
    <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person =>
            <li key={person.id}>{person.name} {person.number}</li>
        )}
    </ul>

export default People