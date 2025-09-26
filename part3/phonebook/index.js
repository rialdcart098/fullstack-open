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
const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }
    next(err)
}
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
    res.send(`<p>Phonebook has info for ${Person.length} people</p><p>${date}</p>`)
})
const generateID = (min, max) => {
    const minCeil = Math.ceil(min)
    const maxFloor = Math.floor(max)
    return String(Math.floor(Math.random() * (maxFloor - minCeil) + minCeil))
}
app.post('/api/persons', (req, res, next) => {
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
    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(err => next(err))
})
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})
app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body
    Person.findById(req.params.id)
        .then(person => {
            if (!person) return res.status(404).end()
            person.name = name
            person.number = number
            return person.save().then(updatedPerson => {
                res.json(updatedPerson)
            })
        })
        .catch(err => next(err))
})
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
