const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
  _id: '62dc38338c0d954c1b811504',
  title: 'The man down there',
  author: 'Blote Hicky',
  url: 'asifsiddique.in/blogs',
  likes: 3201,
  __v: 0
},
{
  _id: '62dcf8ab542f06283e0f993e',
  title: 'Black omit',
  author: 'Poling Wenty',
  url: 'asifsiddique.in/blogs',
  likes: 432,
  __v: 0
}
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Dancing the dale',
    author: 'Loke Poke',
    url: 'asifsiddique.in/blogs',
    likes: 3431,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}