import Note from './Note'
import { useState } from 'react'


const App = (props) => {
  const [notes, setNotes ] = useState(props.notes)
  const [newNotes, setNewNotes] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNotes,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }

    setNotes(notes.concat(noteObj))
    setNewNotes('')
  }
  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNotes(event.target.value)
  }


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all' }
      </button>
      <form onSubmit={addNote}>
        <input value={newNotes} onChange = {handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App