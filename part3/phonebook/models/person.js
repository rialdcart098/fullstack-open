const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d{6,}/.test(v)
            }
        }
    },
})

personSchema.set('toJSON', {
    transform(document, returnedObject) {
        returnedObject.id = String(returnedObject._id)
        delete returnedObject._id
        delete returnedObject.__v
    },
})
module.exports = mongoose.model('Person', personSchema)