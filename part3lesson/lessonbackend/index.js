express = require('express')
morgan = require('morgan')
cors = require('cors')
app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]
app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})
app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Notes has info for ${notes.length} notes</p><p>${date}</p>`)
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})
const generateID = () => {
    const maxID = notes.length > 0 ?
        Math.max(...notes.map(n => Number(n.id))) : 0
    return String(maxID + 1)
}
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }
    const note = {
        important: body.important || false,
        content: body.content,
        id: generateID()
    }
    notes = notes.concat(note)
    res.json(note)
})
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
