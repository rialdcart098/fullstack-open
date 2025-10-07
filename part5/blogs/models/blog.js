require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})
blogSchema.set('toJSON', {
  transform(document, returnedObject) {
    returnedObject.id = String(returnedObject._id)
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Blog', blogSchema)

