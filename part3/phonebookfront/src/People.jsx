import personService from './components/persons'
const People  = ({ setPersons, setMessage, persons, filterText, setCondition }) => {
    const removeButton = id => {
        const name = persons.find(person => person.id === id).name
        if (!window.confirm(`Delete ${name}?`)) return null
        personService
            .remove(id)
            .then(() => {
                setPersons(newPersons => newPersons.filter(person => person.id !== id))
                setCondition(true)
                setMessage(`Deleted ${name}`)
                setTimeout(() => setMessage(''), 5000)
            })
            .catch(() => {
                setPersons(newPersons => newPersons.filter(person => person.id !== id))
                setCondition(false)
                setMessage(`Information of ${name} has already been removed from server`)
                setTimeout(() => setMessage(''), 5000)
            })
    }

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