const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  if (blogs.length) {
    return blogs.reduce(reducer, 0)
  } else if (blogs.length === 0) {
    return 0
  } else {
    return blogs.likes
  }
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)
  const toReturn = {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
  return toReturn
}

const mostBlogs = (blogs) => {
  const result = _.countBy(blogs, 'author')
  const authorWithMaxBlogs = Object.keys(result).reduce(
    function (a, b) {
      return result[a] > result[b] ? a : b
    })
  const numOfBlogs = result[authorWithMaxBlogs]

  const toReturn = {
    author: authorWithMaxBlogs,
    blogs: numOfBlogs
  }

  return toReturn
}

const mostLikes = (blogs) => {
  const mostBlogs = _.groupBy(blogs, 'author')
  const likesArr = {}

  _.forEach(mostBlogs, function (value, key) {
    likesArr[key] = 0
    for (let i = 0; i < value.length; i++) {
      likesArr[key] += value[i].likes
    }
  })

  const authorWithMaxLikes = Object.keys(likesArr).reduce(function(a, b){ return likesArr[a] > likesArr[b] ? a : b })
  const likesCount = likesArr[authorWithMaxLikes]

  const toReturn = {
    author: authorWithMaxLikes,
    likes: likesCount
  }

  return toReturn

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}