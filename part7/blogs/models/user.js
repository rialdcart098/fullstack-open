require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blogs',
    },
  ],
})
userSchema.set('toJSON', {
  transform(document, returnedObject) {
    returnedObject.id = String(returnedObject._id)
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})
module.exports = mongoose.model('User', userSchema)

