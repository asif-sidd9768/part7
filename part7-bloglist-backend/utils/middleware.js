const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if(authorization && authorization.toLowerCase().startsWith('bearer ')){
//     return authorization.substring(7)
//   }
//   return null
// }

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('Here')
    req.token = authorization.substring(7) || null
  }
  next()
}

// const decodedToken = jwt.verify(req.token, process.env.SECRET)
//   if(!decodedToken.id){
//     return res.status(401).json({ error: 'token missing or invalid' })
//   }

const userExtractor = async (req, res, next) => {
  console.log('Hello')
  const token = req.token
  console.log('REQ TOKEN ========== ', token)
  if (req.token) {
    console.log('\n\n\nIN IF BLOCK====== ')
    try {
      const decodedToken = jwt.verify(req.token, process.env.SECRET)
      console.log('DECODED TOKEN ========= ', decodedToken)
      if (decodedToken.id) {
        const user = await User.findById(decodedToken.id)
        req.user = user
        //next()
      }
    } catch (error) {
      next(error)
      res.send({ error: 'invalid or missing token' })
    }
  }
  console.log('AFTER IF BLOCK ')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint '
  })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}