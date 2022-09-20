import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const blogs =  response.data
  return blogs
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('new blog === ', newBlog)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const commentBlog = async (id, commentText) => {
  const config = {
    headers: { Authorization: token }
  }
  const comment = {
    comment: commentText
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment,  config)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog, commentBlog, removeToken }