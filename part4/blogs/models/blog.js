require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
mongoose.connect(url)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Failed to connect with MongoDB: ', err))
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})
blogSchema.set('toJSON', {
  transform(document, returnedObject) {
    returnedObject.id = String(returnedObject._id)
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Blog', blogSchema)

