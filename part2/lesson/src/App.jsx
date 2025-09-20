import Note from './Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import axios from 'axios'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNotes, setNewNotes] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        noteService
            .getAll()
            .then(initNotes => {
                setNotes(initNotes)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObj = {
            content: newNotes,
            important: Math.random() < 0.5,
            id: String(notes.length + 1)
        }

        noteService
            .create(noteObj)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNotes('')
            })
        }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNotes(event.target.value)
    }

    const toggleImportance = (id) => {
        const link = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote : note))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notesToShow.map(note => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                    />
                ))}
            </ul>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
            </button>
            <form onSubmit={addNote}>
                <input value={newNotes} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
