const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs')
  res.status(201).json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if(username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: 'Username or password must be of atleast 3 characters'
    })
  }
  const existingUser = await User.findOne({ username })
  if(existingUser){
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter