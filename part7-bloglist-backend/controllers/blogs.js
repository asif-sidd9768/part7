const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if(authorization && authorization.toLowerCase().startsWith('bearer ')){
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')

  response.json(blogs)
})

blogsRouter.post('/tokens', middleware.userExtractor, async (req, res, next) => {
  // console.log(req)
  try {
    res.json(req.user)
    // const decodedToken = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNwb25nZSIsImlkIjoiNjJlYWE3OWRhMGVlZDE5MzQ1MDFjY2MzIiwiaWF0IjoxNjU5NjAyMDU5fQ.F_vsmNGgLG5Ye2gy5sON314DDFuiXkobPP7A5WoXwiQ', process.env.SECRET)
    // res.send(decodedToken)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)

  console.log(request.params.id)
  console.log(blog)
  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

  if (!request.body.title || !request.body.url) {
    response.status(400).send({
      error: 'invalid object'
    })
    return

  } else {
    // const token = (request)
    if (request.user) {
      const user = await request.user
      console.log('USER   =====  ', user)

      //const user = await User.findById(request.body.userId)

      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user
      })

      console.log(blog)
      // const blog = new Blog(request.body)
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()
      return response.status(201).json(savedBlog)
    }

    response.status(401).json({
      error: 'invalid token'
    })
  }
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const comment = req.body.comment
  const blog = await Blog.findById(req.params.id)
  blog.comments.push(comment)
  const savedBlog = await blog.save()
  res.status(200).send(savedBlog)
})

blogsRouter.put('/:id', async (req, res, next) => {
  const blog = {
    title: req.body.title,
    url: req.body.url,
    author: req.body.author,
    likes: req.body.likes,
    user: req.body.user
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true
    }).populate('user')
    res.json(updatedBlog)
    console.log(updatedBlog)
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const id = req.params.id

  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if(!decodedToken.id){
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  if (req.user) {
    const user = req.user
    const blog = await Blog.findById(id)

    const userId = req.user.id
    console.log(user)
    console.log(blog)

    if (blog.user.toString() === userId.toString()) {
      await Blog.findByIdAndRemove(id)
      return res.status(204).end()
    }
    res.status(401).json({
      error: 'invalid user'
    })
  }
  res.status(401).json({
    error: 'invalid or missing token'
  })

  // try{

  // }catch(exception){
  //   next(exception)
  // }
})

module.exports = blogsRouter