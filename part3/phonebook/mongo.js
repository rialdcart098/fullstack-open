const mongoose = require('mongoose')
if (process.argv.length !== 5 && process.argv.length !== 3){
    console.log('put in all details');
    process.exit(1)
}
const [,, password, name, number] = process.argv;
const url = `mongodb+srv://rialdcart098:${password}@cluster0.fgzzmt0.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 5){
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({})
    .then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
    })
}