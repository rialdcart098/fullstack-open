express = require('express')
morgan = require('morgan')
path = require('path')
require('dotenv').config()
app = express()
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use('/', express.static(path.join('..', 'phonebookfront', 'dist')))
const Person = require('./models/person')
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
let persons = []
app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})
app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
})
app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
const generateID = (min, max) => {
    const minCeil = Math.ceil(min)
    const maxFloor = Math.floor(max)
    return String(Math.floor(Math.random() * (maxFloor - minCeil) + minCeil))
}
app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        const error = !body.name ? 'name' : 'number'
        return res.status(400).json({
            error: `${error} missing`
        })
    }
    const person = new Person ({
        name: body.name,
        number: body.number,
        id: generateID(54785, 87547823423)
    })
    persons = persons.concat(person)
    res.json(person)
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
